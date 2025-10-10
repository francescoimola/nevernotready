import json

# Load the Lighthouse report
with open(r'c:\Users\frnim\Downloads\francescoimola.com-20251010T070744.json', encoding='utf-8') as f:
    data = json.load(f)

audits = data.get('audits', {})

# Get Total Blocking Time details
tbt = audits.get('total-blocking-time', {})
print('Total Blocking Time:', tbt.get('displayValue', ''))

# Get JavaScript execution time
print('\nJavaScript Execution Time:')
bootup = audits.get('bootup-time', {})
if bootup.get('details'):
    items = bootup['details'].get('items', [])
    for item in items[:5]:
        print(f"  {item.get('url', 'Unknown')}: {item.get('total', 0):.0f}ms")

# Get render-blocking resources
print('\nRender-Blocking Resources:')
render = audits.get('render-blocking-resources', {})
if render.get('details'):
    items = render['details'].get('items', [])
    for item in items[:10]:
        print(f"  {item.get('url', 'Unknown')}")
else:
    print('  None found')

# Get unused JavaScript
print('\nUnused JavaScript:')
unused = audits.get('unused-javascript', {})
if unused.get('details'):
    items = unused['details'].get('items', [])
    for item in items[:5]:
        print(f"  {item.get('url', 'Unknown')}: {item.get('wastedBytes', 0)/1024:.1f}KB wasted")

# Get largest contentful paint
lcp = audits.get('largest-contentful-paint', {})
print(f'\nLargest Contentful Paint: {lcp.get("displayValue", "")}')

# Get first contentful paint
fcp = audits.get('first-contentful-paint', {})
print(f'First Contentful Paint: {fcp.get("displayValue", "")}')

# Get speed index
si = audits.get('speed-index', {})
print(f'Speed Index: {si.get("displayValue", "")}')

# Get image optimization opportunities
images = audits.get('modern-image-formats', {})
print('\nImage Format Optimization:')
if images.get('details'):
    items = images['details'].get('items', [])
    for item in items[:5]:
        url = item.get('url', 'Unknown')
        # Get just the filename
        filename = url.split('/')[-1] if '/' in url else url
        print(f"  {filename}: {item.get('wastedBytes', 0)/1024:.1f}KB could be saved")
