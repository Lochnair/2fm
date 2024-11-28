# 2FM
2FM is a simple web app made to browse files from a S3 bucket and let the user download them directly from S3.
It's made with Svelte/SvelteKit simply because I wanted to learn, and it fit well with deploying to Cloudflare Pages as I've done.

While I'm using the free Cloudflare R2 storage, it's using aws4fetch under the hood and should work with other providers as well,
though that has not been tested (the R2 API doesn't allow me to list files/folders as I want, so the S3 API was the only choice anyway).

## Warning about sveltestrap
sveltestrap has does not quite work with Svelte 5 out-of-the-box, so I've had to add `children={false}` to any sveltestrap component that uses it.

## Development
Install the dependencies with `pnpm i` and start the local server with `pnpm run dev`

## Deployment
I've moved to the zero-config @sveltejs/adapter-auto to keep the project supported for multiple platforms.
The .env.example file shows which variable to set for some of the providers if needed, but you _shouldn't_ need to do so.

But in my case it seemed necessary, as I deploy using wrangler, and I assume the way it works is intended for pushing to Git and then
having your provider pull that code and deploy it, I'm not quite sure.

And of course, set your S3 API keys and the URL in the environment file and that should be all.
