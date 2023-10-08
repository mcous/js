import npmRegistryFetch from 'npm-registry-fetch'
import semver from 'semver'

export type VersionEntry = [packageName: string, version: string]

export class UnexpectedPeerResolutionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnexpectedPeerResolutionError'
  }
}

export async function fetchPackageVersions(
  packageName: string,
): Promise<VersionEntry[]> {
  const { entry, peerDependencies } = await fetchPackageAndPeers(packageName)
  const peerEntryTasks = Object.entries(peerDependencies).map(
    ([peerName, peerRange]) => fetchLatestPeer(peerName, peerRange),
  )
  const peerEntries = await Promise.all(peerEntryTasks)

  return [entry, ...peerEntries]
}

interface PackageInfo {
  entry: VersionEntry
  peerDependencies: Record<string, string>
}

async function fetchPackageAndPeers(packageName: string): Promise<PackageInfo> {
  const info = await npmRegistryFetch.json(`/${packageName}/latest`)
  const { version, peerDependencies = {} } = info

  return {
    entry: [packageName, version as string],
    peerDependencies: peerDependencies as Record<string, string>,
  }
}

async function fetchLatestPeer(
  packageName: string,
  range: string,
): Promise<VersionEntry> {
  const info = await npmRegistryFetch.json(`/${packageName}`)
  const allVersions = info.versions as Record<string, unknown>
  const version = semver.maxSatisfying(Object.keys(allVersions), range)

  if (!version) {
    throw new UnexpectedPeerResolutionError(
      `Unable to find version for peer ${packageName} matching ${range}`,
    )
  }

  return [packageName, version]
}
