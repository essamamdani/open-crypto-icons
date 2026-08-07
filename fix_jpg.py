import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_fill = '''        if (format === 'jpg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }'''
new_fill = '''        if (format === 'jpg') {
          ctx.fillStyle = selectedVariant === 'white' ? '#000000' : '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }'''

content = content.replace(old_fill, new_fill)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("JPG export fixed!")
