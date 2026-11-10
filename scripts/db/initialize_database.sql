-- ============================================
-- ClickNShop Database Initialization Script
-- ============================================
-- Run this script using psql with a PostgreSQL superuser
-- Example: psql -U postgres -f scripts\db\initialize_database.sql
-- ============================================

-- Create the clicknshop database if it doesn't exist
-- (PostgreSQL 15+ supports CREATE DATABASE IF NOT EXISTS, but we'll use a safe pattern)
DO
\$do\$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'clicknshop') THEN
        PERFORM pg_catalog.db_create('clicknshop');
    END IF;
END
\$do\$;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE clicknshop TO postgres;
GRANT ALL PRIVILEGES ON DATABASE clicknshop TO public;

-- Connect to the clicknshop database
\c clicknshop

-- ============================================
-- Enable UUID extension
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Seed Categories
-- ============================================
INSERT INTO category (id, name, slug, description) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Fashion and Apparel', 'fashion-and-apparel', 'Fashion and clothing merchants'),
  ('00000000-0000-0000-0000-000000000002', 'Electronics and Technology', 'electronics-and-technology', 'Electronics and tech merchants'),
  ('00000000-0000-0000-0000-000000000003', 'Software and Business', 'software-and-business', 'Software and business services'),
  ('00000000-0000-0000-0000-000000000004', 'Mobile and Connectivity', 'mobile-and-connectivity', 'Mobile carriers and connectivity'),
  ('00000000-0000-0000-0000-000000000005', 'Travel and Transport', 'travel-and-transport', 'Travel and transport services'),
  ('00000000-0000-0000-0000-000000000006', 'Pets and Animals', 'pets-and-animals', 'Pet care and animal supplies'),
  ('00000000-0000-0000-0000-000000000007', 'Health and Wellness', 'health-and-wellness', 'Health and wellness products'),
  ('00000000-0000-0000-0000-000000000008', 'Entertainment and Gifts', 'entertainment-and-gifts', 'Entertainment and gift merchants'),
  ('00000000-0000-0000-0000-000000000009', 'Home and Lifestyle', 'home-and-lifestyle', 'Home and lifestyle merchants')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Seed Affiliate Network (Yazing)
-- ============================================
INSERT INTO affiliate_network (id, name, base_url) VALUES
  ('00000000-0000-0000-0000-000000000010', 'Yazing', 'https://yazing.com')
ON CONFLICT (name) DO NOTHING;

-- Get the network ID for later use
-- \set YAZING_ID `'00000000-0000-0000-0000-000000000010'`

-- ============================================
-- Seed the 38 affiliate destinations
-- ============================================
-- FASHION AND APPAREL (1-11)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000011', 'fansedge', 'https://yazing.com/deals/fansedge/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000012', 'outfitrer', 'https://yazing.com/deals/outfitrer/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000013', 'prana', 'https://yazing.com/deals/prana/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000014', 'shein', 'https://yazing.com/deals/shein/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000015', 'zolucky', 'https://yazing.com/deals/zolucky/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000016', 'zulily', 'https://yazing.com/deals/zulily/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000017', 'athleta', 'https://yazing.com/deals/athleta/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000018', 'barefootdreams', 'https://yazing.com/deals/barefootdreams/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000019', 'columbia', 'https://yazing.com/deals/columbia/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000020', 'cosabella', 'https://yazing.com/deals/cosabella/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000021', 'fitory', 'https://yazing.com/deals/fitory/KennethMuiruri', 'fashion-and-apparel', 'ACTIVE', NULL, NULL)

-- ELECTRONICS AND TECHNOLOGY (12-14)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000022', 'abt', 'https://yazing.com/deals/abt/KennethMuiruri', 'electronics-and-technology', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000023', 'fanttik', 'https://yazing.com/deals/fanttik/KennethMuiruri', 'electronics-and-technology', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000024', 'firemaplegear', 'https://yazing.com/deals/firemaplegear/KennethMuiruri', 'electronics-and-technology', 'ACTIVE', NULL, NULL)

-- SOFTWARE AND BUSINESS (15-20)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000025', 'hostgator', 'https://yazing.com/deals/hostgator/KennethMuiruri', 'software-and-business', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000026', 'onlinecheckwriter', 'https://yazing.com/deals/onlinecheckwriter/KennethMuiruri', 'software-and-business', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000027', 'joinhomebase', 'https://yazing.com/deals/joinhomebase/KennethMuiruri', 'software-and-business', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000028', 'biltrx', 'https://yazing.com/deals/biltrx/KennethMuiruri', 'software-and-business', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000029', 'cyberghostvpn', 'https://yazing.com/deals/cyberghostvpn/KennethMuiruri', 'software-and-business', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000030', 'fastestvpn', 'https://yazing.com/deals/fastestvpn/KennethMuiruri', 'software-and-business', 'ACTIVE', NULL, NULL)

-- MOBILE AND CONNECTIVITY (21-23)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000031', 'amigosim', 'https://yazing.com/deals/amigosim/KennethMuiruri', 'mobile-and-connectivity', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000032', 'attmobile', 'https://yazing.com/deals/attmobile/KennethMuiruri', 'mobile-and-connectivity', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000033', 'consumercellular', 'https://yazing.com/deals/consumercellular/KennethMuiruri', 'mobile-and-connectivity', 'ACTIVE', NULL, NULL)

-- TRAVEL AND TRANSPORT (24-27)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000034', 'priceline', 'https://yazing.com/deals/priceline/KennethMuiruri', 'travel-and-transport', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000035', 'budget', 'https://yazing.com/deals/budget/KennethMuiruri', 'travel-and-transport', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000036', 'cheapoair-ca', 'https://yazing.com/deals/cheapoair-ca/KennethMuiruri', 'travel-and-transport', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000037', 'foxrentacar', 'https://yazing.com/deals/foxrentacar/KennethMuiruri', 'travel-and-transport', 'ACTIVE', NULL, NULL)

-- PETS AND ANIMALS (28-30)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000038', 'petcaresupplies', 'https://yazing.com/deals/petcaresupplies/KennethMuiruri', 'pets-and-animals', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000039', 'canadapetcare', 'https://yazing.com/deals/canadapetcare/KennethMuiruri', 'pets-and-animals', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000040', 'hillspet', 'https://yazing.com/deals/hillspet/KennethMuiruri', 'pets-and-animals', 'ACTIVE', NULL, NULL)

-- HEALTH AND WELLNESS (31-33)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000041', 'bodi', 'https://yazing.com/deals/bodi/KennethMuiruri', 'health-and-wellness', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000042', 'ecowisevitamins', 'https://yazing.com/deals/ecowisevitamins/KennethMuiruri', 'health-and-wellness', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000043', 'hello.health', 'https://yazing.com/deals/hello.health/KennethMuiruri', 'health-and-wellness', 'ACTIVE', NULL, NULL)

-- ENTERTAINMENT AND GIFTS (34-37)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000044', 'giftcards.com', 'https://yazing.com/deals/giftcards.com/KennethMuiruri', 'entertainment-and-gifts', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000045', 'stubhub', 'https://yazing.com/deals/stubhub/KennethMuiruri', 'entertainment-and-gifts', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000046', 'goldbelly', 'https://yazing.com/deals/goldbelly/KennethMuiruri', 'entertainment-and-gifts', 'ACTIVE', NULL, NULL),
  ('00000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000047', 'photowhoa', 'https://yazing.com/deals/photowhoa/KennethMuiruri', 'entertainment-and-gifts', 'ACTIVE', NULL, NULL)

-- HOME AND LIFESTYLE (38)
INSERT INTO affiliate_link (id, program_id, merchant_slug, destination_url, category, status, logo_url, image_url) VALUES
  ('00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000048', 'gardenreet', 'https://yazing.com/deals/gardenreet/KennethMuiruri', 'home-and-lifestyle', 'ACTIVE', NULL, NULL);

-- ============================================
-- Create affiliate programs linked to the Yazing network
-- ============================================
INSERT INTO affiliate_program (id, network_id, program_name, tracking_parameters) VALUES
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000010', 'yazing-fansedge', NULL),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000010', 'yazing-outfitrer', NULL),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000010', 'yazing-prana', NULL),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000010', 'yazing-shein', NULL),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000010', 'yazing-zolucky', NULL),
  ('00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000010', 'yazing-zulily', NULL),
  ('00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000010', 'yazing-athleta', NULL),
  ('00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000010', 'yazing-barefootdreams', NULL),
  ('00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000010', 'yazing-columbia', NULL),
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000010', 'yazing-cosabella', NULL),
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000010', 'yazing-fitory', NULL),
  ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000010', 'yazing-abt', NULL),
  ('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000010', 'yazing-fanttik', NULL),
  ('00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000010', 'yazing-firemaplegear', NULL),
  ('00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000010', 'yazing-hostgator', NULL),
  ('00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000010', 'yazing-onlinecheckwriter', NULL),
  ('00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000010', 'yazing-joinhomebase', NULL),
  ('00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000010', 'yazing-biltrx', NULL),
  ('00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000010', 'yazing-cyberghostvpn', NULL),
  ('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000010', 'yazing-fastestvpn', NULL),
  ('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000010', 'yazing-amigosim', NULL),
  ('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000010', 'yazing-attmobile', NULL),
  ('00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000010', 'yazing-consumercellular', NULL),
  ('00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000010', 'yazing-priceline', NULL),
  ('00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000010', 'yazing-budget', NULL),
  ('00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000010', 'yazing-cheapoair-ca', NULL),
  ('00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000010', 'yazing-foxrentacar', NULL),
  ('00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000010', 'yazing-petcaresupplies', NULL),
  ('00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000010', 'yazing-canadapetcare', NULL),
  ('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000010', 'yazing-hillspet', NULL),
  ('00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000010', 'yazing-bodi', NULL),
  ('00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000010', 'yazing-ecowisevitamins', NULL),
  ('00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000010', 'yazing-hello.health', NULL),
  ('00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000010', 'yazing-giftcards.com', NULL),
  ('00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000010', 'yazing-stubhub', NULL),
  ('00000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000010', 'yazing-goldbelly', NULL),
  ('00000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000010', 'yazing-photowhoa', NULL),
  ('00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000010', 'yazing-gardenreet', NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Create indexes for performance
-- ==========================================--
CREATE INDEX IF NOT EXISTS idx_affiliate_link_program_id ON affiliate_link(program_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_link_category ON affiliate_link(category);
CREATE INDEX IF NOT EXISTS idx_affiliate_link_status ON affiliate_link(status);
CREATE INDEX IF NOT EXISTS idx_merchant_category ON merchant(category_id);
CREATE INDEX IF NOT EXISTS idx_offer_merchant_id ON offer(merchant_id);
CREATE INDEX IF NOT EXISTS idx_offer_category_id ON offer(category_id);
CREATE INDEX IF NOT EXISTS idx_offer_affiliate_program_id ON offer(affiliate_program_id);
CREATE INDEX IF NOT EXISTS idx_click_event_timestamp ON click_event(timestamp);
CREATE INDEX IF NOT EXISTS idx_impression_event_timestamp ON impression_event(timestamp);
CREATE INDEX IF NOT EXISTS idx_conversion_status ON conversion(status);
CREATE INDEX IF NOT EXISTS idx_affiliate_commission_status ON affiliate_commission(status);

-- ============================================
-- Summary
-- ============================================
SELECT 'Database initialization complete' AS status;
SELECT COUNT(*) AS total_merchants FROM affiliate_link;
SELECT COUNT(*) AS active_merchants FROM affiliate_link WHERE status = 'ACTIVE';
SELECT '38 unique affiliate destinations seeded' AS seed_status;