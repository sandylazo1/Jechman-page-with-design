param(
    [string]$OutputZip = "$env:USERPROFILE\Downloads\JECHMAN-WordPress-portal.zip"
)

$repoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$distRoot = [System.IO.Path]::GetFullPath((Join-Path $repoRoot 'dist'))
if (-not $distRoot.StartsWith($repoRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw 'La carpeta temporal debe quedar dentro del repositorio.'
}

$packageRoot = Join-Path $distRoot 'jechman-portal'
if (Test-Path -LiteralPath $packageRoot) {
    $resolvedPackage = [System.IO.Path]::GetFullPath($packageRoot)
    if (-not $resolvedPackage.StartsWith($distRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw 'La carpeta que se limpiara esta fuera de dist.'
    }
    Remove-Item -LiteralPath $packageRoot -Recurse -Force
}

New-Item -ItemType Directory -Path (Join-Path $packageRoot 'site') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $repoRoot 'wordpress\jechman-portal\jechman-portal.php') -Destination $packageRoot
Copy-Item -LiteralPath (Join-Path $repoRoot 'wordpress\jechman-portal\portal-template.php') -Destination $packageRoot
Copy-Item -LiteralPath (Join-Path $repoRoot 'wordpress\jechman-portal\route-bridge.js') -Destination $packageRoot
Copy-Item -LiteralPath (Join-Path $repoRoot 'index.html') -Destination (Join-Path $packageRoot 'site')
Copy-Item -LiteralPath (Join-Path $repoRoot 'news.json') -Destination (Join-Path $packageRoot 'site')
Copy-Item -LiteralPath (Join-Path $repoRoot 'glassindex.html') -Destination (Join-Path $packageRoot 'site')
if (Test-Path -LiteralPath (Join-Path $repoRoot '404.html')) {
    Copy-Item -LiteralPath (Join-Path $repoRoot '404.html') -Destination (Join-Path $packageRoot 'site')
}
Copy-Item -LiteralPath (Join-Path $repoRoot 'assets') -Destination (Join-Path $packageRoot 'site') -Recurse

$outputAbsolute = [System.IO.Path]::GetFullPath($OutputZip)
$outputParent = Split-Path -Parent $outputAbsolute
if (-not (Test-Path -LiteralPath $outputParent)) {
    New-Item -ItemType Directory -Path $outputParent -Force | Out-Null
}
if (Test-Path -LiteralPath $outputAbsolute) {
    Remove-Item -LiteralPath $outputAbsolute -Force
}
Compress-Archive -LiteralPath $packageRoot -DestinationPath $outputAbsolute -CompressionLevel Optimal
Get-Item -LiteralPath $outputAbsolute | Select-Object FullName,Length
