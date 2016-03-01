### Bitbucket Api
-----

### Bitbucket-Api的使用
```
npm install bitbucket-api
var Bitbucket = require("bitbucket-api")
var api = new Bitbucket(client_id, secret)
```

### 当前功能
```
	- user
		- api.ownerProfile: 获取当前用户的资料
		- api.userEmails: 获取授权的Emails
		- api.userProfile: 获取指定用户的资料
			- param: username
		- api.followers: 获取用户的followers
			- param: username
		- api.following: 获取用户的following
			- param: username
		- api.repos: 获取用户的项目地址
			- param: username
```

### Bitbucket Api地址
	https://confluence.atlassian.com/bitbucket/user-endpoint-2-0-744527199.html