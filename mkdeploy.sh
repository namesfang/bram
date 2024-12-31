#!/bin/bash

dir=$(pwd)

app=$(grep -Po '"name"\s*:\s*"\K[^"]+' ./package.json)

deploydir="/home/$USER/deploy/$app-dist"

if [ ! -d "$deploydir" ]; then
  mkdir -p "$deploydir"
fi

# 删除临时目录
# rm -rf $deploydir

cp -r "$dir/deploy" "$deploydir"

# 拷贝资源
if [ -d "$dir/build" ]; then
  cp -r "$dir/build" "$deploydir/build"
fi

# 拷贝ORM
cp -r "$dir/prisma" "$deploydir/prisma"
# 清理数据库文件
rm -rf $deploydir/prisma/*.db

# 拷贝
for name in package.json package-lock.json pm2.config.cjs .npmrc .env-example; do
  source="$dir/$name"
  if [ -f "$source" ]; then
    cp "$source" "$deploydir/$name"
  fi
done

echo "Success."


