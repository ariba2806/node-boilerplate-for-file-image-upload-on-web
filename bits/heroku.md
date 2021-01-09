## Heroku deployment commands

```bash
# heroku remote is set up when we create
heroku create <unique_app_name>

# Set the environment variables like this
heroku config:set <key>=<value>
heroku config:unset <key>

# push to heroku
git push heroku master
```