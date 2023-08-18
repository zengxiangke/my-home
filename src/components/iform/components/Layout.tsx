function Layout({ areas, children }: { areas: string[][]; children: any }) {
  const areasString = areas.map((row) => `"${row.join(' ')}"`).join(' ');
  return (
    <div style={{ display: 'grid', gridTemplateAreas: areasString }}>
      {children}
    </div>
  );
}

function LayoutItem({ area, children }: { area: string; children: any }) {
  return <div style={{ gridArea: area }}>{children}</div>;
}

Layout.Item = LayoutItem;

export default Layout;
