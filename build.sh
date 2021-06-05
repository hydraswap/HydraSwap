#!/bin/bash

set -e

NAME="hydraswap"
GROUP="defi"
REGISTRY="harbor.cplus.link/ex-web"
VERSION="dirty-version"

# 编译
function Compile() {
    echo "Complie $NAME:$1"
    # npm install
    # npm run build
    echo "------------------------------------"
}

# build镜像(build要求一定传入版本号)
function Build() {
    echo "Build $NAME:$1"
    #IMAGE=$REGISTRY/$NAME
    #docker build -t "$IMAGE:$1" ./
    #docker push $IMAGE
    /kaniko/executor --context $(dirname $0) --dockerfile $(dirname $0)/Dockerfile --destination $IMAGE:$1 --cleanup
    echo "Build $NAME:$1 OK"
    echo "------------------------------------"
}

# 自动部署(deploy要求一定传入版本号)
function Deploy() {
    echo "Deploy $NAME:$1"
    echo "$GROUP"
    ansible abitqa -m shell -a "/data/scripts/deploy-cloneset.sh -g $GROUP -s $NAME -i $IMAGE -v $1"
    echo "Deploy $NAME:$1 OK"
    echo "------------------------------------"
}

#
if [[ $(expr match "$2"  '[a-zA-Z]*-v[0-9].*.[0-9].*.[1-9].*$') != 0 ]];then
    VERSION=$2
    IMAGE=$REGISTRY/qa/$NAME
    PROJ=$(echo $2 | awk -F "-" '{print $1}')
    GROUP="$PROJ"qa
elif [[ $(expr match "$2"  '[a-zA-Z]*-v[0-9].*.[0-9].*.0.*$') != 0 ]];then
    VERSION=$2
    IMAGE=$REGISTRY/prod/$NAME
else
    VERSION=$2-$COMMIT
    IMAGE=$REGISTRY/dev/$NAME
    PROJ=$(echo $2 | awk -F "-" '{print $1}')
    GROUP="$PROJ"dev
fi

if [ "$1" == "build" ];then
    Build $VERSION
elif [ "$1" == "deploy" ];then
    Deploy $VERSION
else
    Compile $VERSION
fi
