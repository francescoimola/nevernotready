import json

with open(r'c:\Users\frnim\Downloads\francescoimola.com-20251010T070744.json', encoding='utf-8') as f:
    data = json.load(f)

audits = data.get('audits', {})

print('FONT-RELATED ISSUES:\n')

# Font Display
font_display = audits.get('font-display', {})
print(f"Font Display: {font_display.get('title', '')}")
print(f"Score: {font_display.get('score', 'N/A')}")
print(f"Description: {font_display.get('description', '')}")
if font_display.get('details'):
    items = font_display['details'].get('items', [])
    for item in items:
        print(f"  - {item.get('url', 'Unknown')}")
print()

# Preconnect
preconnect = audits.get('uses-rel-preconnect', {})
print(f"Preconnect: {preconnect.get('title', '')}")
print(f"Score: {preconnect.get('score', 'N/A')}")
if preconnect.get('details'):
    items = preconnect['details'].get('items', [])
    for item in items:
        print(f"  - {item.get('url', 'Unknown')}")
print()

# Preload
preload = audits.get('uses-rel-preload', {})
print(f"Preload Key Requests: {preload.get('title', '')}")
print(f"Score: {preload.get('score', 'N/A')}")
if preload.get('details'):
    items = preload['details'].get('items', [])
    for item in items:
        print(f"  - {item.get('url', 'Unknown')}")
print()

# Network requests - filter for fonts
print("Font files loaded:")
network = audits.get('network-requests', {})
if network.get('details'):
    items = network['details'].get('items', [])
    for item in items:
        url = item.get('url', '')
        if 'font' in url.lower() or url.endswith(('.woff2', '.woff', '.ttf', '.otf')):
            print(f"  - {url}")
            print(f"    Size: {item.get('transferSize', 0)/1024:.1f}KB")
            print(f"    Time: {item.get('endTime', 0) - item.get('startTime', 0):.0f}ms")
