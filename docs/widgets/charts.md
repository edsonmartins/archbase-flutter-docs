---
sidebar_position: 4
---

# Charts

Wrappers opinados sobre `fl_chart` que usam a `chartPalette` do tema automaticamente.

## `ArchbaseLineChart`

```dart
ArchbaseLineChart(
  title: 'Vendas',
  subtitle: 'Últimos 30 dias',
  series: [
    ArchbaseChartSeries(
      name: 'Total',
      points: [
        ArchbaseChartPoint(0, 100),
        ArchbaseChartPoint(1, 150),
        ArchbaseChartPoint(2, 130),
      ],
    ),
  ],
  showLegend: true,
  yLabelFormatter: (v) => 'R\$${v.toInt()}',
)
```

## `ArchbasePieChart`

Donut com center text + animação no toque:

```dart
ArchbasePieChart(
  title: 'Por categoria',
  slices: [
    ArchbaseChartSlice(label: 'A', value: 30),
    ArchbaseChartSlice(label: 'B', value: 25),
    ArchbaseChartSlice(label: 'C', value: 45),
  ],
  donut: true,
  centerText: '100',
  centerSubtext: 'total',
)
```

## `ArchbaseBarChart`

```dart
ArchbaseBarChart(
  title: 'Por mês',
  series: [
    ArchbaseChartSeries(
      name: '2025',
      points: [
        ArchbaseChartPoint(0, 100),
        ArchbaseChartPoint(1, 120),
        // ...
      ],
    ),
  ],
  xLabels: ['Jan', 'Fev', 'Mar', 'Abr'],
)
```

## `ArchbaseAreaChart`

LineChart com preenchimento abaixo da linha:

```dart
ArchbaseAreaChart(
  series: [/* ... */],
  areaOpacity: 0.25,
)
```

## Dados compartilhados

- `ArchbaseChartPoint(x, y)` — ponto numérico (`double`)
- `ArchbaseChartSeries({name, points, color?})` — série; cor opcional, default vem da paleta do tema
- `ArchbaseChartSlice({label, value, color?})` — slice de pie chart

## Empty state

Quando todos os pontos/slices são vazios, o widget mostra um `ArchbaseEmptyState` em vez do gráfico, com `emptyMessage` customizável.
