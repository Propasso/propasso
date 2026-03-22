

## Plan: Add "Load More" to Kennisbank Recente Publicaties

### What changes

**File: `src/pages/Kennisbank.tsx`**

1. Add a `visibleCount` state, initialized to 6
2. Replace `recentPosts` slice with `posts?.slice(0, visibleCount)`
3. Add a "Meer artikelen laden" button below the grid that increments `visibleCount` by 6
4. Hide the button when all posts are visible
5. Button uses existing design system (`Button` component, `variant="outline"`)

### Technical detail

- No new routes, pages, or API calls needed
- The `fetchAllPosts` query already returns all published posts; we just control how many render
- Button text: "Meer artikelen laden" with a subtle count indicator like "(6 van 18)"
- Smooth scroll-friendly: new cards animate in with existing `fadeInUp` motion variants

### No other files affected

The existing query, routing, and page structure remain unchanged.

