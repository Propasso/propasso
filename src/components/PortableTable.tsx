/**
 * Tabel uit Sanity (blocktype "dataTable", plugin @sanity/table) als semantische HTML-tabel.
 * Gebruikt in de PortableText-body van KennisbankArticle en KennisbankPillar.
 * Alleen de tabel scrollt horizontaal op smalle schermen, de pagina niet.
 */

type TableRow = { _key?: string; cells?: string[] };

export type DataTableValue = {
  _key?: string;
  caption?: string;
  firstRowIsHeader?: boolean;
  table?: { rows?: TableRow[] };
};

const PortableTable = ({ value }: { value: DataTableValue }) => {
  const rows = (value?.table?.rows ?? []).filter((row) => Array.isArray(row?.cells));
  if (rows.length === 0) return null;

  const hasHeader = value.firstRowIsHeader !== false && rows.length > 1;
  const headerRow = hasHeader ? rows[0] : null;
  const bodyRows = hasHeader ? rows.slice(1) : rows;
  const columnCount = Math.max(...rows.map((row) => row.cells?.length ?? 0));
  const caption = value.caption?.trim();

  const padCells = (cells: string[] = []) =>
    Array.from({ length: columnCount }, (_, i) => cells[i] ?? "");

  return (
    <div className="my-8 max-w-full overflow-x-auto rounded-2xl border border-border/40">
      <table className="w-full border-collapse text-left text-[15px] md:text-base text-foreground/85">
        {caption && (
          <caption className="caption-top px-4 pt-4 pb-3 text-left text-sm text-muted-foreground">
            {caption}
          </caption>
        )}
        {headerRow && (
          <thead className="bg-secondary">
            <tr>
              {padCells(headerRow.cells).map((cell, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-4 py-3 align-top font-semibold text-foreground"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={row._key ?? rowIndex} className="border-t border-border/40">
              {padCells(row.cells).map((cell, i) => (
                <td key={i} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortableTable;
