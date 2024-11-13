# 2FM
2FM is a simple web app made to browse files from a S3 bucket and let the user download them directly from S3.
It's made with Svelte/SvelteKit simply because I wanted to learn, and it fit well with deploying to Cloudflare Pages as I've done.

While I'm using the free Cloudflare R2 storage, it's using aws4fetch under the hood and should work with other providers as well,
though that has not been tested (the R2 API doesn't allow me to list files/folders as I want, so the S3 API was the only choice anyway).

## Warning about sveltestrap
Since it's a new project I've gone for Svelte 5, however there are changes that broke some svelestrap components (see https://github.com/sveltestrap/sveltestrap/issues/100)
So I've mitigated this locally for now by replacing "children" with "content" as mentioned in the issue.

The pnpm lockfile will refer to my local copy of sveltestrap with the fixes, so if the install doesn't work, remove the lockfile and try again.

## Development
Install the dependencies with `pnpm i` and start the local server with `pnpm run dev`

## Deployment
If you've got your Cloudflare Page set up with the project, simply run `pnpm run deploy`

Currently I'm using the cloudflare adapter for Svelte, so you might want to use another adapter for your host,
or possibly `adapter-auto` which should choose the right one automatically. I'm looking into how `adapter-auto` could be used instead as the default for the project,
so it'll wherever the user would like to.
