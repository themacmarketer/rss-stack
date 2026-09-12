#!/bin/bash
set -e

APP_NAME="QuickRSS-Folders"
BUILD_DIR="build/${APP_NAME}.app"
CONTENTS_DIR="${BUILD_DIR}/Contents"
MACOS_DIR="${CONTENTS_DIR}/MacOS"
RESOURCES_DIR="${CONTENTS_DIR}/Resources"

echo "🔨 Creating Mac App Bundle structure..."
mkdir -p "${MACOS_DIR}"
mkdir -p "${RESOURCES_DIR}"

echo "📦 Compiling Swift native app..."
swiftc -O -target arm64-apple-macosx14.0 \
  -framework AppKit \
  -framework WebKit \
  -framework Network \
  src/main.swift \
  -o "${MACOS_DIR}/${APP_NAME}"

echo "🎨 Copying UI resources..."
cp preview/index.html "${RESOURCES_DIR}/"
cp preview/styles.css "${RESOURCES_DIR}/"
cp preview/app.js "${RESOURCES_DIR}/"
if [ -f "assets/AppIcon.icns" ]; then
  cp assets/AppIcon.icns "${RESOURCES_DIR}/"
fi

echo "📄 Creating Info.plist..."
cat <<EOF > "${CONTENTS_DIR}/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleExecutable</key>
    <string>${APP_NAME}</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundleIdentifier</key>
    <string>com.wangchujiang.quickrss.folders</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>${APP_NAME}</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>3.1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>14.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>Viewer</string>
            <key>CFBundleURLName</key>
            <string>com.wangchujiang.quickrss.folders</string>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>quickrss</string>
                <string>quick-rss</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
EOF

echo "✍️ Signing app bundle..."
codesign --force --deep --sign - "${BUILD_DIR}"

echo "🚀 Installing ${APP_NAME}.app to /Applications..."
cp -R "${BUILD_DIR}" /Applications/
codesign --force --deep --sign - "/Applications/${APP_NAME}.app"

echo "✅ App successfully generated at /Applications/${APP_NAME}.app"

