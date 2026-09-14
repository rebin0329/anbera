-- ==============================================================================
-- ANBERA — V1 DATABASE FOUNDATION
-- 
-- Tables:
-- 1. businesses
-- 2. analyses
-- 3. scores
-- 4. score_categories
-- 5. opportunities
--
-- Security:
-- - Row Level Security (RLS) enabled on all tables
-- - Zero public write access
-- - Owner-based isolation for authenticated users
-- ==============================================================================

-- 1. BUSINESSES
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    industry TEXT,
    website TEXT,
    goal TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_businesses_owner_id ON businesses(owner_id);

-- 2. ANALYSES
CREATE TABLE IF NOT EXISTS analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    provider TEXT NOT NULL DEFAULT 'demo',
    model_version TEXT NOT NULL DEFAULT 'v1.0.0',
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    raw_inputs JSONB NOT NULL DEFAULT '{}'::jsonb,
    data_sources JSONB NOT NULL DEFAULT '[]'::jsonb,
    confidence NUMERIC(4, 3) NOT NULL DEFAULT 1.000 CHECK (confidence >= 0 AND confidence <= 1),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analyses_business_id ON analyses(business_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created_by ON analyses(created_by);

-- 3. SCORES
CREATE TABLE IF NOT EXISTS scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL UNIQUE REFERENCES analyses(id) ON DELETE CASCADE,
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    power_score INTEGER NOT NULL CHECK (power_score >= 0 AND power_score <= 100),
    confidence NUMERIC(4, 3) NOT NULL DEFAULT 1.000 CHECK (confidence >= 0 AND confidence <= 1),
    model_version TEXT NOT NULL DEFAULT 'v1.0.0',
    summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scores_analysis_id ON scores(analysis_id);
CREATE INDEX IF NOT EXISTS idx_scores_business_id ON scores(business_id);

-- 4. SCORE_CATEGORIES
CREATE TABLE IF NOT EXISTS score_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    score_id UUID NOT NULL REFERENCES scores(id) ON DELETE CASCADE,
    category_key TEXT NOT NULL CHECK (category_key IN (
        'brand_positioning',
        'visibility',
        'customer_experience',
        'conversion',
        'automation',
        'growth_readiness'
    )),
    name TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    weight NUMERIC(4, 3) NOT NULL CHECK (weight >= 0 AND weight <= 1),
    confidence NUMERIC(4, 3) NOT NULL DEFAULT 1.000 CHECK (confidence >= 0 AND confidence <= 1),
    explanation TEXT,
    signals JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_score_category UNIQUE (score_id, category_key)
);

CREATE INDEX IF NOT EXISTS idx_score_categories_score_id ON score_categories(score_id);

-- 5. OPPORTUNITIES
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Visibility',
        'Conversion',
        'Automation',
        'Brand',
        'Customer Experience',
        'Growth',
        'Content',
        'Sales',
        'Marketing',
        'Operations'
    )),
    explanation TEXT NOT NULL,
    business_impact TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    confidence NUMERIC(4, 3) NOT NULL DEFAULT 1.000 CHECK (confidence >= 0 AND confidence <= 1),
    recommended_action TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'recommended' CHECK (status IN (
        'recommended',
        'viewed',
        'accepted',
        'rejected',
        'completed'
    )),
    outcome TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_opportunities_business_id ON opportunities(business_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_analysis_id ON opportunities(analysis_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- 1. BUSINESSES POLICIES
CREATE POLICY "businesses_select_owner" ON businesses
FOR SELECT TO authenticated
USING (owner_id = (SELECT auth.uid()));

CREATE POLICY "businesses_insert_owner" ON businesses
FOR INSERT TO authenticated
WITH CHECK (owner_id = (SELECT auth.uid()));

CREATE POLICY "businesses_update_owner" ON businesses
FOR UPDATE TO authenticated
USING (owner_id = (SELECT auth.uid()))
WITH CHECK (owner_id = (SELECT auth.uid()));

CREATE POLICY "businesses_delete_owner" ON businesses
FOR DELETE TO authenticated
USING (owner_id = (SELECT auth.uid()));

-- 2. ANALYSES POLICIES
CREATE POLICY "analyses_select_owner" ON analyses
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = analyses.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "analyses_insert_owner" ON analyses
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = analyses.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "analyses_update_owner" ON analyses
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = analyses.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "analyses_delete_owner" ON analyses
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = analyses.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

-- 3. SCORES POLICIES
CREATE POLICY "scores_select_owner" ON scores
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = scores.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "scores_insert_owner" ON scores
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = scores.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "scores_update_owner" ON scores
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = scores.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "scores_delete_owner" ON scores
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = scores.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

-- 4. SCORE_CATEGORIES POLICIES
CREATE POLICY "score_categories_select_owner" ON score_categories
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM scores s
    JOIN businesses b ON b.id = s.business_id
    WHERE s.id = score_categories.score_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "score_categories_insert_owner" ON score_categories
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM scores s
    JOIN businesses b ON b.id = s.business_id
    WHERE s.id = score_categories.score_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "score_categories_update_owner" ON score_categories
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM scores s
    JOIN businesses b ON b.id = s.business_id
    WHERE s.id = score_categories.score_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "score_categories_delete_owner" ON score_categories
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM scores s
    JOIN businesses b ON b.id = s.business_id
    WHERE s.id = score_categories.score_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

-- 5. OPPORTUNITIES POLICIES
CREATE POLICY "opportunities_select_owner" ON opportunities
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = opportunities.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "opportunities_insert_owner" ON opportunities
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = opportunities.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "opportunities_update_owner" ON opportunities
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = opportunities.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY "opportunities_delete_owner" ON opportunities
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = opportunities.business_id
      AND b.owner_id = (SELECT auth.uid())
  )
);
