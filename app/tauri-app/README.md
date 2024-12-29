# Tauri App Readme

## Debug mode

Debug mode is enabled in `commonContants.js` by setting `DEBUG` to `true`.

To disable tracking of file:
`git update-index --skip-worktree "src\common\constants\common.constants.js"`
`git update-index --skip-worktree "shared\constants\common.constants.js"`

To enable tracking of file
`git update-index --no-skip-worktree "src\common\constants\common.constants.js"`
`git update-index --no-skip-worktree "shared\constants\common.constants.js"`

## Running the app

To run the app, simply run this:
`npm run dev`

## Publish with Github Pages

To publish the app with GithubPages, simply run this:
`npm run deploy`

