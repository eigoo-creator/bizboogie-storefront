import api from './api';

const podApi = {
  async getProducts(page = 1, limit = 50) {
    const { data } = await api.get('/api/pod/products', { params: { page, limit } });
    return data;
  },

  async getProduct(productId) {
    const { data } = await api.get(`/api/pod/products/${productId}`);
    return data;
  },

  async createOrder(orderPayload) {
    const { data } = await api.post('/api/pod/order', orderPayload);
    return data;
  },

  async getOrders(page = 1, limit = 25, status = null) {
    const params = { page, limit };
    if (status) params.status = status;
    const { data } = await api.get('/api/pod/orders', { params });
    return data;
  },

  async getShipping(blueprintId, providerId) {
    const { data } = await api.get(`/api/pod/shipping/${blueprintId}/${providerId}`);
    return data;
  },
};

export default podApi;
