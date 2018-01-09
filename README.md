![](https://www.coindesk.com/wp-content/themes/coindesk2/images/events/consensus-2015/sponsors-and-partners/general-assembly.png)

# WDI 30, PROJECT 4 - IWISH
## Deployment

When deploying the app for the first time ensure you have run the following steps in order:

1. `heroku create`
1. `heroku addons:create mongolab`
1. `heroku config:set NPM_CONFIG_PRODUCTION=false`
1. `git push heroku master`
1. `heroku open`

After that simply `git commit` and `git push heroku master`.

## Important

Ensure that you add any relevant environment variables to heroku with `heroku config:set`, eg:

`heroku config:set AWS_BUCKET_NAME=wdi-project-4`
