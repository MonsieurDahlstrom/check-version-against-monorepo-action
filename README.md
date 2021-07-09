# Check a package.jaon against released versions within a repo.

This action allows monorepos to validate different package.json version against already published versions in a registry.

## Inputs

## `repository`

**Required** The name of the person to greet.

## `directory`

**Required** The name of the person to greet.

## `ref`

**Required** The name of the person to greet.

## Outputs

## `newer`

if package.json was never then what is publihed in the registry.

## Example usage

uses: actions/check-version-against-monorepo-action@main
with:
repository: 'MonsieurDahlstrom/workflow-test'
directory: 'dist'
ref: 'refs/tags/v0.4.100-alpha.2.0'
