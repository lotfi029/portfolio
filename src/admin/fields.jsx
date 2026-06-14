// Small reusable form controls for the admin editor.

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'

export function TextField({ label, value, onChange, textarea, rows = 3, type = 'text' }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </span>
      )}
      {textarea ? (
        <textarea
          className={inputCls}
          rows={rows}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={inputCls}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
}

export function CheckboxField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
      />
      {label}
    </label>
  )
}

const btnSm =
  'rounded-md px-2.5 py-1 text-xs font-semibold transition-colors'

// Editor for an array of plain strings.
export function StringList({ label, values = [], onChange, placeholder = 'Item' }) {
  const update = (i, v) => onChange(values.map((x, idx) => (idx === i ? v : x)))
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i))
  const add = () => onChange([...values, ''])
  return (
    <div>
      {label && (
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </span>
      )}
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputCls}
              value={v ?? ''}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className={`${btnSm} shrink-0 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className={`${btnSm} mt-2 bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-900/40 dark:text-brand-300`}
      >
        + Add
      </button>
    </div>
  )
}

// Editor for an array of objects. `fields` describes each editable property:
//   { key, label, type: 'text' | 'textarea' | 'stringlist' | 'checkbox' }
export function ObjectList({ label, items = [], onChange, fields, makeEmpty }) {
  const updateItem = (i, key, value) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)))
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, makeEmpty()])
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = items.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div>
      {label && (
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
          {label}
        </h3>
      )}
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/40"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">#{i + 1}</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} className={`${btnSm} bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200`}>↑</button>
                <button type="button" onClick={() => move(i, 1)} className={`${btnSm} bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200`}>↓</button>
                <button type="button" onClick={() => remove(i)} className={`${btnSm} bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300`}>Remove</button>
              </div>
            </div>
            <div className="space-y-3">
              {fields.map((f) => {
                const value = item[f.key]
                if (f.type === 'stringlist')
                  return (
                    <StringList
                      key={f.key}
                      label={f.label}
                      values={value || []}
                      onChange={(v) => updateItem(i, f.key, v)}
                    />
                  )
                if (f.type === 'checkbox')
                  return (
                    <CheckboxField
                      key={f.key}
                      label={f.label}
                      value={value}
                      onChange={(v) => updateItem(i, f.key, v)}
                    />
                  )
                return (
                  <TextField
                    key={f.key}
                    label={f.label}
                    value={value}
                    textarea={f.type === 'textarea'}
                    onChange={(v) => updateItem(i, f.key, v)}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className={`${btnSm} mt-3 bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-900/40 dark:text-brand-300`}
      >
        + Add entry
      </button>
    </div>
  )
}
