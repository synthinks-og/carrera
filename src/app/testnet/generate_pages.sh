#!/bin/bash

# Folder asal yang akan dicopy
SOURCE_FOLDER="avail"

# Daftar nama folder tujuan
folders=("kopi" "sym" "tern" "axone" "dill" "initia" "nubit" "tanssi" "union")

# Loop melalui setiap folder tujuan
for folder in "${folders[@]}"; do
  # Pastikan folder tujuan ada
  mkdir -p "$folder"
  
  # Copy file dari folder avail ke folder tujuan
  cp "$SOURCE_FOLDER/page.tsx" "$folder/page.tsx"

  # Gantilah isi file sesuai dengan nama folder
  sed -i "s/avail/$folder/g" "$folder/page.tsx"
  sed -i "s/Avail/${folder^}/g" "$folder/page.tsx"
done
