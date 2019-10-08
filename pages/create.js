import React from 'react';
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
  FormGroup,
} from 'semantic-ui-react';

import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: '',
};

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    const isProduct = Object.values(product).every((el) =>
      Boolean(el),
    );
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'media') {
      setProduct((prevState) => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'reactreserve');
    data.append('cloud_name', 'marcelonilima');
    const response = await axios.post(
      process.env.CLOUDINARY_URL,
      data,
    );
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      const response = await axios.post(url, payload);
      setLoading(false);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form
        loading={loading}
        success={success}
        onSubmit={handleSubmit}
        error={Boolean(error)}
      >
        <Message error icon="check" header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Sucess!"
          content="Your product has been posted."
        />

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            value={product.name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="media"
            label="Media"
            type="file"
            accept="image*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>

        <Image src={mediaPreview} rounded centered size="small" />

        <Form.Group widths="equal">
          <Form.Field
            control={TextArea}
            name="description"
            label="Description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Field
            control={Button}
            color="blue"
            disabled={disabled || loading}
            icon="pencil alternate"
            content="Submit"
            type="submit"
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default CreateProduct;
