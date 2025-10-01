-- ==========================================
-- نظام المسابقة - Leaderboard System
-- Supabase Database Setup
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. جدول المشرفين (Admins)
-- ==========================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  avatar_url TEXT,
  total_points INTEGER DEFAULT 0,
  attendance INTEGER DEFAULT 0,
  delays INTEGER DEFAULT 0,
  absences INTEGER DEFAULT 0,
  last_reward_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. جدول الإجراءات (Admin Actions Log)
-- ==========================================
CREATE TABLE IF NOT EXISTS admin_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  points INTEGER NOT NULL,
  description TEXT,
  performed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. جدول الجوائز (Rewards History)
-- ==========================================
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL CHECK (rank IN (1, 2, 3)),
  points INTEGER NOT NULL,
  vip_days INTEGER DEFAULT 0,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  awarded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. Indexes for Performance
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_admins_total_points ON admins(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_admin_actions_admin_id ON admin_actions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_actions_created_at ON admin_actions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rewards_admin_id ON rewards(admin_id);

-- ==========================================
-- 5. Row Level Security (RLS) Policies
-- ==========================================

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Admins Table Policies
-- القراءة: متاح للجميع (لعرض لوحة الترتيب)
CREATE POLICY "Allow public read access to admins"
  ON admins FOR SELECT
  USING (true);

-- الكتابة والتحديث: متاح فقط للمصادقين
CREATE POLICY "Allow authenticated insert to admins"
  ON admins FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update to admins"
  ON admins FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete to admins"
  ON admins FOR DELETE
  TO authenticated
  USING (true);

-- Admin Actions Table Policies
-- القراءة: متاح للمصادقين فقط
CREATE POLICY "Allow authenticated read access to admin_actions"
  ON admin_actions FOR SELECT
  TO authenticated
  USING (true);

-- الكتابة: متاح للمصادقين فقط
CREATE POLICY "Allow authenticated insert to admin_actions"
  ON admin_actions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Rewards Table Policies
-- القراءة: متاح للجميع
CREATE POLICY "Allow public read access to rewards"
  ON rewards FOR SELECT
  USING (true);

-- الكتابة: متاح للمصادقين فقط
CREATE POLICY "Allow authenticated insert to rewards"
  ON rewards FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ==========================================
-- 6. Storage Bucket for Avatar Images
-- ==========================================

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Avatars
CREATE POLICY "Public can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can update avatars"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can delete avatars"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars');

-- ==========================================
-- 7. Functions for Auto-updating Timestamps
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for admins table
CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 8. Function to Calculate Top 3 (Optional Helper)
-- ==========================================

CREATE OR REPLACE FUNCTION get_top_3_admins()
RETURNS TABLE (
  id UUID,
  name TEXT,
  initials TEXT,
  avatar_url TEXT,
  total_points INTEGER,
  attendance INTEGER,
  delays INTEGER,
  absences INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT a.id, a.name, a.initials, a.avatar_url, 
         a.total_points, a.attendance, a.delays, a.absences
  FROM admins a
  ORDER BY a.total_points DESC
  LIMIT 3;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 9. Sample Data (Optional - Remove in Production)
-- ==========================================

-- Uncomment to insert sample data for testing
/*
INSERT INTO admins (name, initials, total_points, attendance, delays, absences)
VALUES 
  ('سارة علي', 'سع', 180, 25, 2, 0),
  ('أحمد محمد', 'أم', 145, 22, 4, 1),
  ('محمود حسن', 'مح', 132, 20, 5, 2),
  ('فاطمة أحمد', 'فأ', 115, 18, 6, 3),
  ('خالد يوسف', 'خي', 98, 16, 7, 4),
  ('نور الدين', 'ند', 85, 14, 8, 5);
*/

-- ==========================================
-- Installation Complete!
-- ==========================================
-- تم إنشاء قاعدة البيانات بنجاح
-- 
-- الخطوات التالية:
-- 1. قم بإنشاء مستخدم إداري في Supabase Auth
-- 2. ارفع هذا الملف في Supabase SQL Editor
-- 3. تأكد من إضافة SUPABASE_URL و SUPABASE_ANON_KEY في Secrets
-- 4. ابدأ بإضافة المشرفين من لوحة التحكم
-- ==========================================
