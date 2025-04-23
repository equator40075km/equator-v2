import os
import importlib
from pathlib import Path

from src.core.models import Base


def import_models():
    project_root = Path(__file__).parent

    for root, _, files in os.walk(project_root):
        if "models.py" in files:
            rel_path = Path(root).relative_to(project_root)
            module_parts = ["src"] + list(rel_path.parts) + ["models"]
            module_path = ".".join(module_parts)

            try:
                importlib.import_module(module_path)
            except ImportError as e:
                print(f"Ошибка импорта {module_path}: {e}")


import_models()
