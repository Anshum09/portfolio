---
title: Microfluidic tumor-on-chip device
summary: A two-layer perfusion chip designed in Fusion 360 to hold cancer cells in a defined chamber under controlled flow.
category: Microfluidics
status: Design complete
date: 2026-11
tools: [Fusion 360, Python API]
featured: true
draft: false
---

Standard well-plate culture is static: cells sit in fixed media with no flow. Tumors in the body are perfused, so nutrient, oxygen, and drug exposure all depend on flow. This chip is designed to bring that flow into a small, imageable culture platform for studying the tumor microenvironment.

## Design

The device is two parts: a channel plate and a thin lid. The lid carries the port holes and seals the channels.

- Two inlets that merge into one channel, so media can be delivered alongside a separate drug or cell stream
- A serpentine section to mix the streams before they reach the cells
- A central culture chamber where the cells sit under flow
- A single outlet for perfusion and effluent collection
- Chamfered ports intended to support leak-resistant tubing connections

![Top view of the channel layer: two inlets, serpentine mixer, culture chamber, outlet](02-top-view.png)

![Exploded view: channel plate and lid](03-exploded.png)

## Specifications

- Chip: 75 x 25 x 3 mm with 3 mm corner radii, plus a 1 mm lid
- Channels: 1 mm wide, 0.6 mm deep
- Culture chamber: 8 mm diameter
- Ports: 3 mm diameter, 2.5 mm deep

![Dimensioned drawing of the channel plate with side views](05-drawing.png)

## What it is intended for

The layout is built to support controlled perfusion of cancer cells in one defined chamber. That setup is intended for studying drug response, nutrient and oxygen gradients, and cell-cell interactions under flow, which a static well plate cannot do.

## Parametric model

The model is driven by one parameter set in Fusion 360. Channel, chamber, and port dimensions can be changed in one place and the geometry updates with them.

## Status

Design only. The chip has not been fabricated or tested, so no flow or cell results are claimed here.
