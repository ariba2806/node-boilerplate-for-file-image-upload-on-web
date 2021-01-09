## Creating Sorting, Pagingation

For making this easier, pass another object to `mongoose.Schema` with `timestamps: true`.

This will create two more fields in our document:
- createdAt,
- updatedAt

Best way to achieve sorting, pagination is by using query parameters.

`127.0.0.1:3000/tasks?completed=true?limit=10`