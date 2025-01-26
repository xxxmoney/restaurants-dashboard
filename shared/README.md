# Shared "library"

## Debug mode

Debug mode is enabled in `common.constants.js` by setting `DEBUG` to `true`.

To disable tracking of file:
`git update-index --skip-worktree "shared\constants\common.constants.js"`

To enable tracking of file
`git update-index --no-skip-worktree "shared\constants\common.constants.js"`