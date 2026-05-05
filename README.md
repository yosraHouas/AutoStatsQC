# AutoStats QC — Frontend React

Interface web de consultation et d'analyse des statistiques d'immatriculation de véhicules au Canada.

Ce projet fait partie de l'application full stack **AutoStats QC**, avec un backend en **ASP.NET Core (.NET 10)** utilisant **Entity Framework Core** et SQL Server.

---

## Aperçu

AutoStats QC permet de :

- Visualiser les données d'immatriculation (Statistique Canada)
- Filtrer par année et type de véhicule
- Naviguer avec pagination côté serveur
- Afficher un graphique de répartition par type de carburant
- Déclencher l'import des données via le backend

---

## Stack technique

| Catégorie | Technologie |
|----------|------------|
| Framework UI | React 19 + TypeScript |
| State Management | Zustand |
| Charts | Recharts |
| HTTP Client | Axios |
| Styles | Tailwind CSS |
| Build | Vite |
| Tests | Vitest |

---

## Prérequis

- Node.js >= 20
- pnpm (ou npm/yarn)
- Backend ASP.NET Core en cours d'exécution

---

## Installation

```bash
git clone https://github.com/<username>/AutoStatsQC.git
cd frontend
pnpm install