## Mocking

Process of mocking is replacing the real functions that run with our functions.

When we use SendGrid like service we've paid or free tier so we don't want to waste our limit.

Hence Mocking functions are important part of testing.

The directory name Jest will look for:
```
__mocks__
```

File Path/Name
```
Folder: @sendgrid
File: mail
final path: '@sendgrid/mail'
```

Jest will replace our module import of `@sendgrid/mail` with the above module.