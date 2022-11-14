module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      uuid: String,
      provider_uuid: String,
      schedule_uuid: String,
      scheduled_date: String,
      scheduled_time: String,
      available: Boolean, 
      create_at: String,
      create_at: String,
      user: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
 
  return mongoose.model("available", schema);
};
