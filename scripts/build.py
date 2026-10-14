"""Optional build fallback for environments without Node.js."""
from pathlib import Path
import shutil
root = Path(__file__).resolve().parent.parent
out = root / 'dist'
if out.exists():
    shutil.rmtree(out)
out.mkdir()
shutil.copy2(root / 'index.html', out / 'index.html')
shutil.copytree(root / 'src', out / 'src')
print('Built dist/ with relative asset paths.')
