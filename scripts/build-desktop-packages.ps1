# Generador de Paquetes WordPress Oficiales JECHMAN (Linux forward-slash compliant)
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$repoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$desktop = [System.IO.Path]::Combine($env:USERPROFILE, 'Desktop')

$liteZipPath = [System.IO.Path]::Combine($desktop, 'JECHMAN-WordPress-portal-instalable.zip')
$fullZipPath = [System.IO.Path]::Combine($desktop, 'JECHMAN-WordPress-portal-completo.zip')
$versionLiteZipPath = [System.IO.Path]::Combine($desktop, 'JECHMAN-WordPress-portal-v1.5.0.zip')
$versionFullZipPath = [System.IO.Path]::Combine($desktop, 'JECHMAN-WordPress-portal-v1.5.0-completo.zip')
$unpackedDir = [System.IO.Path]::Combine($desktop, 'JECHMAN-WordPress-portal')

# 1. Preparar staging temporal
$distRoot = Join-Path $repoRoot 'dist'
if (Test-Path $distRoot) { Remove-Item $distRoot -Recurse -Force }
New-Item -ItemType Directory -Path (Join-Path $distRoot 'lite/jechman-portal/site') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $distRoot 'full/jechman-portal/site') -Force | Out-Null

# Copiar archivos base
$baseFiles = @(
    'wordpress\jechman-portal\jechman-portal.php',
    'wordpress\jechman-portal\portal-template.php',
    'wordpress\jechman-portal\route-bridge.js'
)

foreach ($f in $baseFiles) {
    Copy-Item (Join-Path $repoRoot $f) (Join-Path $distRoot 'lite/jechman-portal') -Force
    Copy-Item (Join-Path $repoRoot $f) (Join-Path $distRoot 'full/jechman-portal') -Force
}

$siteFiles = @('index.html', 'news.html', 'news.json', '404.html', 'glassindex.html')
foreach ($sf in $siteFiles) {
    $src = Join-Path $repoRoot $sf
    if (Test-Path $src) {
        Copy-Item $src (Join-Path $distRoot 'lite/jechman-portal/site') -Force
        Copy-Item $src (Join-Path $distRoot 'full/jechman-portal/site') -Force
    }
}

# En el paquete full, incluir también assets
Copy-Item (Join-Path $repoRoot 'assets') (Join-Path $distRoot 'full/jechman-portal/site/assets') -Recurse -Force

# Función para empaquetar con System.IO.Compression y FORWARD SLASHES (Linux WP compatible)
function Create-CleanZip {
    param(
        [string]$SourceDirectory,
        [string]$ZipFilePath
    )
    if (Test-Path $ZipFilePath) { Remove-Item $ZipFilePath -Force }
    
    $zip = [System.IO.Compression.ZipFile]::Open($ZipFilePath, [System.IO.Compression.ZipArchiveMode]::Create)
    $sourceUri = New-Object System.Uri(($SourceDirectory.TrimEnd('\') + '\'))
    
    Get-ChildItem -Path $SourceDirectory -Recurse -File | ForEach-Object {
        $fileUri = New-Object System.Uri($_.FullName)
        $relativePath = $sourceUri.MakeRelativeUri($fileUri).ToString()
        # Forzar forward-slash para WordPress en Linux
        $entryName = $relativePath.Replace('\', '/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
    
    $zip.Dispose()
}

# Generar ZIP ligero (subible por wp-admin sin límites de PHP)
Write-Host "Generando paquete instalable para wp-admin..."
Create-CleanZip -SourceDirectory (Join-Path $distRoot 'lite') -ZipFilePath $liteZipPath

# Generar ZIP completo (para respaldo o cPanel)
Write-Host "Generando paquete completo para respaldo..."
Create-CleanZip -SourceDirectory (Join-Path $distRoot 'full') -ZipFilePath $fullZipPath

# Generar copias con el nombre de la versión v1.5.0
Copy-Item $liteZipPath $versionLiteZipPath -Force
Copy-Item $fullZipPath $versionFullZipPath -Force

# Actualizar carpeta descomprimida en Desktop
if (Test-Path $unpackedDir) { Remove-Item $unpackedDir -Recurse -Force }
Copy-Item (Join-Path $distRoot 'lite/jechman-portal') $unpackedDir -Recurse -Force

Write-Host "Paquetes creados exitosamente en Desktop:"
Get-Item $versionLiteZipPath, $versionFullZipPath | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
