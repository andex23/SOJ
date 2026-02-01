import {
  getAnalyticsSummary,
  getSalesByProduct,
  getSalesOverTime,
  getSalesByMethod,
  getRecentSales,
} from '@/lib/analytics'
import { formatPriceUSD } from '@/lib/utils'

export default async function DashboardPage() {
  const [summary, byProduct, overTime, byMethod, recent] = await Promise.all([
    getAnalyticsSummary(),
    getSalesByProduct(),
    getSalesOverTime('daily'),
    getSalesByMethod(),
    getRecentSales(15),
  ])

  return (
    <div>
      <h1 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', color: '#525252' }}>
        Analytics
      </h1>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '0.25rem' }}>
            Total Revenue
          </div>
          <div style={{ fontSize: '1.25rem' }}>
            {formatPriceUSD(summary.totalRevenue)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '0.25rem' }}>
            Confirmed Orders
          </div>
          <div style={{ fontSize: '1.25rem' }}>
            {summary.confirmedOrders}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '0.25rem' }}>
            Pending Orders
          </div>
          <div style={{ fontSize: '1.25rem' }}>
            {summary.pendingOrders}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '0.25rem' }}>
            Failed Orders
          </div>
          <div style={{ fontSize: '1.25rem' }}>
            {summary.failedOrders}
          </div>
        </div>
      </div>

      {/* Sales by Product */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '1rem' }}>
          Sales by Product
        </h2>
        {byProduct.length === 0 ? (
          <p style={{ color: '#8a8a8a', fontSize: '0.875rem' }}>No confirmed sales yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Product</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Orders</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {byProduct.map((row) => (
                <tr key={row.product_slug} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td style={{ padding: '0.5rem 0' }}>{row.product_name}</td>
                  <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{row.count}</td>
                  <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{formatPriceUSD(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Sales Over Time */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '1rem' }}>
          Sales Over Time (Daily)
        </h2>
        {overTime.length === 0 ? (
          <p style={{ color: '#8a8a8a', fontSize: '0.875rem' }}>No confirmed sales yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Orders</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {overTime.map((row) => (
                <tr key={row.period} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td style={{ padding: '0.5rem 0' }}>{row.period}</td>
                  <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{row.count}</td>
                  <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{formatPriceUSD(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Sales by Payment Method */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '1rem' }}>
          Sales by Payment Method
        </h2>
        {byMethod.length === 0 ? (
          <p style={{ color: '#8a8a8a', fontSize: '0.875rem' }}>No confirmed sales yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Method</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Orders</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {byMethod.map((row) => (
                <tr key={row.payment_method} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td style={{ padding: '0.5rem 0', textTransform: 'uppercase' }}>{row.payment_method}</td>
                  <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{row.count}</td>
                  <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{formatPriceUSD(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Recent Sales */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '1rem' }}>
          Recent Sales
        </h2>
        {recent.length === 0 ? (
          <p style={{ color: '#8a8a8a', fontSize: '0.875rem' }}>No sales recorded yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                <th style={{ textAlign: 'left', padding: '0.4rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Ref</th>
                <th style={{ textAlign: 'left', padding: '0.4rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Product</th>
                <th style={{ textAlign: 'right', padding: '0.4rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Amount</th>
                <th style={{ textAlign: 'right', padding: '0.4rem 0', fontWeight: 'normal', color: '#8a8a8a' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((sale) => (
                <tr key={sale.id} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td style={{ padding: '0.4rem 0', fontSize: '0.75rem' }}>{sale.reference}</td>
                  <td style={{ padding: '0.4rem 0' }}>{sale.product_slug}</td>
                  <td style={{ textAlign: 'right', padding: '0.4rem 0' }}>{formatPriceUSD(sale.amount_usd)}</td>
                  <td style={{
                    textAlign: 'right',
                    padding: '0.4rem 0',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    color: sale.status === 'confirmed' ? '#4a7c59' : sale.status === 'failed' ? '#8b4545' : '#8a8a8a',
                  }}>
                    {sale.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
