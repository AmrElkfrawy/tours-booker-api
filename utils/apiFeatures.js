class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };

    const excludedFields = ['page', 'sort', 'limit', 'field'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    queryObj = JSON.parse(queryStr);

    this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.replaceAll(',', ' '));
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.field) {
      this.query = this.query.select(
        this.queryString.field.replaceAll(',', ' '),
      );
    } else {
      this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
