Add-Type -AssemblyName System.Drawing

function New-PointF {
    param([double]$X, [double]$Y)
    $p = New-Object System.Drawing.PointF
    $p.X = [single]$X
    $p.Y = [single]$Y
    return ,$p
}

function New-AppIcon {
    param(
        [int]$Size,
        [string]$OutFile
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.Clear([System.Drawing.Color]::FromArgb(255, 13, 107, 92))

    $branco = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 13, 107, 92), [Math]::Max(4.0, $Size / 28.0))
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $s = [double]$Size
    $cx = $s / 2.0

    # Página esquerda
    $left = New-Object System.Drawing.Drawing2D.GraphicsPath
    $l0 = New-PointF $cx ($s * 0.22)
    $l1 = New-PointF ($s * 0.32) ($s * 0.15)
    $l2 = New-PointF ($s * 0.16) ($s * 0.18)
    $l3 = New-PointF ($s * 0.12) ($s * 0.28)
    $l4 = New-PointF ($s * 0.10) ($s * 0.50)
    $l5 = New-PointF ($s * 0.12) ($s * 0.74)
    $l6 = New-PointF ($s * 0.22) ($s * 0.84)
    $l7 = New-PointF ($s * 0.38) ($s * 0.78)
    $l8 = New-PointF $cx ($s * 0.70)
    $left.AddBezier($l0[0], $l1[0], $l2[0], $l3[0])
    $left.AddBezier($l3[0], $l4[0], $l5[0], $l6[0])
    $left.AddBezier($l6[0], $l7[0], $l8[0], $l8[0])
    $left.CloseFigure()
    $g.FillPath($branco, $left)

    # Página direita
    $right = New-Object System.Drawing.Drawing2D.GraphicsPath
    $r0 = New-PointF $cx ($s * 0.22)
    $r1 = New-PointF ($s * 0.68) ($s * 0.15)
    $r2 = New-PointF ($s * 0.84) ($s * 0.18)
    $r3 = New-PointF ($s * 0.88) ($s * 0.28)
    $r4 = New-PointF ($s * 0.90) ($s * 0.50)
    $r5 = New-PointF ($s * 0.88) ($s * 0.74)
    $r6 = New-PointF ($s * 0.78) ($s * 0.84)
    $r7 = New-PointF ($s * 0.62) ($s * 0.78)
    $r8 = New-PointF $cx ($s * 0.70)
    $right.AddBezier($r0[0], $r1[0], $r2[0], $r3[0])
    $right.AddBezier($r3[0], $r4[0], $r5[0], $r6[0])
    $right.AddBezier($r6[0], $r7[0], $r8[0], $r8[0])
    $right.CloseFigure()
    $g.FillPath($branco, $right)

    # Lombada
    $g.DrawLine($pen, [single]$cx, [single]($s * 0.24), [single]$cx, [single]($s * 0.70))

    $g.Dispose()
    $bmp.Save($OutFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$root = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $root "icons"
New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
New-AppIcon -Size 192 -OutFile (Join-Path $iconsDir "icon-192.png")
New-AppIcon -Size 512 -OutFile (Join-Path $iconsDir "icon-512.png")
Write-Output "icons ok"
