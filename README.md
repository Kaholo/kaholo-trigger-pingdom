# kaholo-trigger-bitbucket
Simple webhook trigger for Pingdom

## How to use:
After installing the plugin on Kaholo,
on the pingdom website, go to Integration and add a new webhook with the trigger url

## Alert Trigger:
Triggers whenever pingdom sends a request after a certain event occurs(to your determination, can be decided when configuring the webhook in Pingdom)

### Webhook URL:
**{KAHOLO_URL}/webhook/pingdom/alert**

### Parameters:
1) Check Type - When provided, accept only requests that belongs to a certain type of check. Default value is Any.
2) Check Name Pattern - Check name or name [minimatch pattern](https://github.com/isaacs/minimatch#readme).
    When provided accept only requests with the check name specified. If not provided, accept any.