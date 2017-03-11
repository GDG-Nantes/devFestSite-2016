google-cloud-sdk/bin/gcloud config set app/use_appengine_api false
google-cloud-sdk/bin/gcloud config set app/promote_by_default false
echo $GAE_KEY_FILE_CONTENT > file.key
echo "Authenticate with $GAE_SERVICE_ACCOUNT"
google-cloud-sdk/bin/gcloud auth activate-service-account $GAE_SERVICE_ACCOUNT --key-file file.key
echo "Deploying to devfest"
ls -l
google-cloud-sdk/bin/gcloud --project devfestnantes2016 app deploy --version v17 --quiet dist/app.yaml
