/**
 * EIGOO POD Engine — Unified Frontend API Client
 * Supports Printify + Printful via backend proxy at /api/pod/*
 */
import api from './api';

const podApi = {
  /**
   * Fetch all published POD products from all configured providers.
   * @param {number} page
   * @param {number} limit
   * @param {string|null} provider - 'printify', 'printful', or null for all
   */
  async getProducts(page = 1, limit = 50, provider = null) {
    const params = { page, limit };
    if (provider) params.provider = provider;
    const { data } = await api.get('/api/pod/products', { params });
    return data;
  },

  /**
   * Fetch a single POD product with full variant details.
   * Printful IDs are prefixed with 'pf-'. Backend routes automatically.
   */
  async getProduct(productId) {
    const { data } = await api.get(`/api/pod/products/${productId}`);
    return data;
  },

  /**
   * Submit a new order to the correct provider via backend proxy.
   * @param {Object} orderPayload - Must include 'provider' field ('printify' or 'printful')
   */
  async createOrder(orderPayload) {
    const { data } = await api.post('/api/pod/order', orderPayload);
    return data;
  },

  /**
   * Admin: List all orders from all providers.
   */
  async getOrders(page = 1, limit = 25, status = null, provider = null) {
    const params = { page, limit };
    if (status) params.status = status;
    if (provider) params.provider = provider;
    const { data } = await api.get('/api/pod/orders', { params });
    return data;
  },

  /**
   * Get shipping info for a Printify blueprint/provider combination.
   */
  async getShipping(blueprintId, providerId) {
    const { data } = await api.get(`/api/pod/shipping/${blueprintId}/${providerId}`);
    return data;
  },

  /**
   * Health check — returns status of all connected POD providers.
   */
  async healthCheck() {
    const { data } = await api.get('/api/pod/health');
    return data;
  },
};

export default podApi;
