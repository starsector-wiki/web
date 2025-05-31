import os
import shutil
from pathlib import Path

def clear_directory(target_dir):
    """清空目标文件夹中的所有内容"""
    target = Path(target_dir)
    if not target.exists():
        target.mkdir(parents=True)
        return

    for item in target.iterdir():
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()
    print(f"已清空目标目录: {target_dir}")

def copy_relative_paths(source_root, relative_paths, target_root):
    """
    从源根目录复制指定的相对路径到目标目录，保持相对路径结构

    参数:
        source_root: 源根目录路径
        relative_paths: 相对于source_root的路径列表
        target_root: 目标根目录路径
    """
    source_base = Path(source_root)
    target_base = Path(target_root)

    for rel_path in relative_paths:
        src_path = source_base / rel_path
        dst_path = target_base / rel_path

        if not src_path.exists():
            print(f"警告: 源路径不存在 - {src_path}")
            continue

        if src_path.is_file():
            dst_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src_path, dst_path)
            print(f"复制文件: {rel_path}")
        elif src_path.is_dir():
            shutil.copytree(src_path, dst_path, dirs_exist_ok=True)
            print(f"复制目录: {rel_path}")

if __name__ == "__main__":
    # 配置参数
    SOURCE_ROOT = "/opt/starsector_098/graphics"  # 源根目录
    TARGET_ROOT = "/home/wilson/Projects/starsector-wiki-web/public/graphics"  # 目标根目录

    # 相对于SOURCE_ROOT的路径列表
    RELATIVE_PATHS = [
        "factions",
        "fx/empty.png",
        "icons",
        "missiles",
        "planets",
        "portraits",
        "ships",
        "starscape",
        "warroom",
        "weapons",
        "hullmods",
    ]

    # 1. 清空目标目录
    clear_directory(TARGET_ROOT)

    # 2. 复制指定相对路径的内容
    copy_relative_paths(SOURCE_ROOT, RELATIVE_PATHS, TARGET_ROOT)

    print("操作完成!")
