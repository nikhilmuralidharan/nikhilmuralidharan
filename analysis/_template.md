---
title: Your Analysis Title
date: 2026-01-01
description: A one-sentence description for the listing card.
tags: [Tag1, Tag2, Tag3]
---

## Introduction

Brief motivation — what circuit are you analysing and why is it interesting?

## Circuit Overview

Describe the topology. You can embed images with:

```
![Circuit schematic](../assets/img/your-image.png)
```

## Analysis

### DC Operating Point

Hand calculations and/or simulation results.

Use inline math: $V_{GS} = V_{DD} - I_D R_S$

Use display math for longer equations:

$$
A_v = -g_m \left( r_o \| R_L \right)
$$

### Small-Signal Model

Derive the small-signal equivalent and key transfer functions.

$$
H(s) = \frac{A_0}{1 + s/\omega_p}
$$

### Frequency Response

Pole-zero analysis, gain-bandwidth product, phase margin.

### Noise Analysis

Input-referred noise, dominant noise sources.

$$
\overline{v_{n,in}^2} = 4kT\gamma g_m \cdot \frac{1}{g_m^2} = \frac{4kT\gamma}{g_m}
$$

## Simulation Results

Summarise key sim results. Include plots as images.

| Parameter       | Simulated | Target  |
|-----------------|-----------|---------|
| DC Gain         | 52 dB     | > 50 dB |
| Unity-GBW       | 120 MHz   | > 100 MHz|
| Phase Margin    | 62°       | > 60°   |

## Key Takeaways

- Bullet point summary of the main design insights.
- What would you do differently?

## References

1. Razavi, B. *Design of Analog CMOS Integrated Circuits*. McGraw-Hill, 2001.
2. Gray, P. et al. *Analysis and Design of Analog Integrated Circuits*. Wiley, 2009.
