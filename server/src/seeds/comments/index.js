const colors = require('colors/safe');
const commentSchema = require('../../api/v1/comments/index.model');
const { commentsDB, usersDB, productsDB } = require('../../db');
const { purify } = require('../../helpers/sanitize');
const { defaultContent: content } = require('../../helpers/variables/comments');
const {
  commentsDeletedMessage,
  commentsSeededMessage,
} = require('../../helpers/variables/tasks');

const createComment = (i, user, product) => ({
  user_id: i % 2 === 0 ? user : '',
  product_id: product,
  content,
});

const removeComments = async () => {
  try {
    await commentsDB.remove();

    // eslint-disable-next-line no-console
    console.log(colors.green(commentsDeletedMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleComments = async () => {
  const comments = [];

  try {
    const user = await usersDB.findOne({});
    const products = await productsDB.find({});

    const userId = `${user._id}`;

    products.forEach((product) => {
      const productId = `${product._id}`;

      for (let i = 0; i < 10; i += 1) {
        const comment = createComment(i, userId, productId);

        const { schemaError, data } = commentSchema(comment);

        if (schemaError) {
        // eslint-disable-next-line no-console
          console.error(colors.red(schemaError.details[0].message));
          process.exit(0);
        }

        data.purify_content = purify(data.content);

        comments.push({
          ...data,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        });
      }
    });

    await commentsDB.remove();
    await commentsDB.insert(comments);

    // eslint-disable-next-line no-console
    console.log(colors.green(commentsSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  removeComments,
  seedExampleComments,
};
