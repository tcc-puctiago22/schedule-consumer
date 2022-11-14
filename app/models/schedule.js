module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      uuid: String,
      associeate: Object,
      provider: Object,
      partner: Object,
      description: String,
      occupational: String,
      city: String,
      uf: String,
      scheduled_date: String,
      scheduled_time: String,
      status: String,
      create_at: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
 
  return mongoose.model("schedule", schema);
};
