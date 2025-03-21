#!/bin/sh

set -ue

SCRIPT_DIR=$(
  cd -- "$(dirname "$0")" >/dev/null 2>&1
  pwd -P
)
PROJECT_PATH=$(realpath "${SCRIPT_DIR}")

# 部署解压缓存临时目录
DEPLOY_UNZIP_TMP_DIR="./deploy_temp"
# 部署目录名
DEPLOY_DIR_NAME="html"
# 部署目录
DEPLOY_DIR_PATH="./nginx/${DEPLOY_DIR_NAME}"

# 备份目录
BACKUP_DIR_PATH="$PROJECT_PATH/backup"
# 回滚目录
ROLLBACK_DIR_PATH="$PROJECT_PATH/rollback"

deploy() {
  cd "${PROJECT_PATH}"

  DEPLOY_PACKAGE_PATH="$1"
  echo "Load package: ${DEPLOY_PACKAGE_PATH}"
  if [ -f "${DEPLOY_PACKAGE_PATH}" ]; then
    if [ -d "${DEPLOY_UNZIP_TMP_DIR}" ]; then
      echo "Clean old temp ${DEPLOY_UNZIP_TMP_DIR}"
      rm -rf "${DEPLOY_UNZIP_TMP_DIR}"
    fi
    mkdir -p "${DEPLOY_UNZIP_TMP_DIR}"
    unzip -q -o -d "${DEPLOY_UNZIP_TMP_DIR}" "${DEPLOY_PACKAGE_PATH}"
  else
    echo "Can't find file ${DEPLOY_PACKAGE_PATH}"
    exit 1
  fi

  if [ ! -d "${DEPLOY_UNZIP_TMP_DIR}" ]; then
    echo "Can't find dir ${DEPLOY_UNZIP_TMP_DIR}"
    exit 1
  fi

  if [ -z "$(ls -A "${DEPLOY_UNZIP_TMP_DIR}")" ]; then
    echo "No deploy files"
    rm -rf "${DEPLOY_UNZIP_TMP_DIR}"
    return 0
  fi

  echo "Deploy: ${DEPLOY_DIR_PATH}"
  if [ -d "${DEPLOY_DIR_PATH}" ]; then
    rm -rf "${DEPLOY_DIR_PATH}"
    mv -f "${DEPLOY_UNZIP_TMP_DIR}" "${DEPLOY_DIR_PATH}"
  else
    echo "Can't find dir ${DEPLOY_DIR_PATH}"
    exit 1
  fi
}

backup() {
  cd "${PROJECT_PATH}"

  BACKUP_TAG="$1"
  echo "Backup tag: ${BACKUP_TAG}"

  BACKUP_TAG_PATH="${BACKUP_DIR_PATH}/${BACKUP_TAG}"
  echo "Backup to: ${BACKUP_TAG_PATH}"
  if [ -d "${BACKUP_TAG_PATH}" ]; then
    if [ -z "$(ls -A "${BACKUP_TAG_PATH}")" ]; then
      echo "Reuse exist but empty backup dir"
    else
      echo "Backup tag already exists"
      exit 1
    fi
  else
    mkdir -p "${BACKUP_TAG_PATH}"
  fi

  echo "Backup: ${DEPLOY_DIR_PATH}"
  if [ -d "${DEPLOY_DIR_PATH}" ]; then
    cp -rfp "${DEPLOY_DIR_PATH}" "${BACKUP_TAG_PATH}/"
  else
    echo "Can't find dir ${DEPLOY_DIR_PATH}"
  fi

  if [ -z "$(ls -A "${BACKUP_TAG_PATH}")" ]; then
    echo "No backup files"
    rm -rf "${BACKUP_TAG_PATH}"
    return 0
  fi

  echo "Packaging backup files ..."
  BACKUP_PKG_PATH="${BACKUP_DIR_PATH}/${BACKUP_TAG}.tar.gz"

  cd "${BACKUP_DIR_PATH}"
  tar -zcf "${BACKUP_PKG_PATH}" "${BACKUP_TAG}"
  cd "${PROJECT_PATH}"

  echo "Cleaning temp files"
  rm -rf "${BACKUP_TAG_PATH}"

  if [ -f "${BACKUP_PKG_PATH}" ]; then
    echo "Backup success: ${BACKUP_PKG_PATH}"
  else
    echo "Backup failed: backup package not found"
  fi
}

rollback() {
  cd "${PROJECT_PATH}"

  BACKUP_TAG="$1"
  echo "Backup tag to rollback: ${BACKUP_TAG}"

  ROLLBACK_PKG_PATH="${BACKUP_DIR_PATH}/${BACKUP_TAG}.tar.gz"
  if [ -f "${ROLLBACK_PKG_PATH}" ]; then
    echo "Loading backup package"
    cd "${BACKUP_DIR_PATH}"
    tar -xzf "${ROLLBACK_PKG_PATH}"
    cd "${PROJECT_PATH}"

    BACKUP_TAG_PATH="${BACKUP_DIR_PATH}/${BACKUP_TAG}"
    if [ -z "$(ls -A "${BACKUP_TAG_PATH}")" ]; then
      echo "No rollback files"
      rm -rf "${BACKUP_TAG_PATH}"
      return 0
    fi

    if [ -d "${ROLLBACK_DIR_PATH}" ]; then
      rm -rf "${ROLLBACK_DIR_PATH}"
    fi
    mkdir -p "${ROLLBACK_DIR_PATH}"

    ROLLBACK_PATH="${BACKUP_TAG_PATH}/${DEPLOY_DIR_NAME}"
    echo "Rollback dir: ${ROLLBACK_PATH}"
    if [ -d "${ROLLBACK_PATH}" ]; then
      mv -f "${DEPLOY_DIR_PATH}" "${ROLLBACK_DIR_PATH}/"
      mv -f "${ROLLBACK_PATH}" "${DEPLOY_DIR_PATH}"
    else
      echo "No file to rollback"
    fi

    echo "Cleaning temp files"
    rm -rf "${BACKUP_TAG_PATH}"

    echo "Rollback success: ${BACKUP_TAG}"
  else
    echo "Can't find rollback package ${BACKUP_TAG}!"
    exit 1
  fi
}

print_help() {
  echo "Usage: $0 [COMMAND] [OPTION...]"
  echo "Commands:"
  echo "  deploy [PACKAGE_ZIP]    Deploy server"
  echo "  backup [TAG]            Backup server as tag"
  echo "  rollback [TAG]          Rollback server from tag"
}

if [ -z "${1+x}" ]; then
  print_help "$0"
  exit 1
fi

case "$1" in
deploy)
  if [ -z "${2+x}" ]; then
    echo "Empty package path!"
    exit 1
  else
    deploy "$2"
  fi
  ;;
backup)
  if [ -z "${2+x}" ]; then
    echo "Empty backup tag!"
    exit 1
  else
    backup "$2"
  fi
  ;;
rollback)
  if [ -z "${2+x}" ]; then
    echo "Empty backup tag to rollback!"
    exit 1
  else
    rollback "$2"
  fi
  ;;
*)
  echo "Unknown command: $1"
  print_help "$0"
  exit 1
  ;;
esac

exit 0
