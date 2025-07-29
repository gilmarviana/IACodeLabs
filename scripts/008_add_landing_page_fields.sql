-- Add new columns to the site_content table for full landing page customization
ALTER TABLE site_content
ADD COLUMN IF NOT EXISTS header_logo_text TEXT DEFAULT 'IA Code Labs',
ADD COLUMN IF NOT EXISTS hero_button1_text TEXT DEFAULT 'Comece Agora',
ADD COLUMN IF NOT EXISTS hero_button2_text TEXT DEFAULT 'Saiba Mais',
ADD COLUMN IF NOT EXISTS features_title TEXT DEFAULT 'Recursos Poderosos',
ADD COLUMN IF NOT EXISTS feature1_title TEXT DEFAULT 'Desenvolvimento Acelerado',
ADD COLUMN IF NOT EXISTS feature1_description TEXT DEFAULT 'Utilize IA para gerar código, automatizar tarefas e acelerar seu ciclo de desenvolvimento.',
ADD COLUMN IF NOT EXISTS feature2_title TEXT DEFAULT 'Soluções Inovadoras',
ADD COLUMN IF NOT EXISTS feature2_description TEXT DEFAULT 'Crie produtos e serviços inovadores com a ajuda de algoritmos de IA avançados.',
ADD COLUMN IF NOT EXISTS feature3_title TEXT DEFAULT 'Escalabilidade e Performance',
ADD COLUMN IF NOT EXISTS feature3_description TEXT DEFAULT 'Desenvolva aplicações robustas e escaláveis prontas para o futuro.',
ADD COLUMN IF NOT EXISTS about_section_title TEXT DEFAULT 'Sobre Nós',
ADD COLUMN IF NOT EXISTS contact_section_title TEXT DEFAULT 'Entre em Contato',
ADD COLUMN IF NOT EXISTS contact_section_description TEXT DEFAULT 'Tem alguma pergunta ou quer discutir seu próximo projeto? Entre em contato conosco!',
ADD COLUMN IF NOT EXISTS contact_button_text TEXT DEFAULT 'Enviar E-mail',
ADD COLUMN IF NOT EXISTS footer_text TEXT DEFAULT '© 2023 IA Code Labs. Todos os direitos reservados.',
ADD COLUMN IF NOT EXISTS hero_gradient_from TEXT DEFAULT '#171717', -- Cor de início do gradiente (gray-900)
ADD COLUMN IF NOT EXISTS hero_gradient_to TEXT DEFAULT '#000000'; -- Cor final do gradiente (black)

-- Optional: Update existing row with default values if it exists and new columns are null
UPDATE site_content
SET
  header_logo_text = COALESCE(header_logo_text, 'IA Code Labs'),
  hero_button1_text = COALESCE(hero_button1_text, 'Comece Agora'),
  hero_button2_text = COALESCE(hero_button2_text, 'Saiba Mais'),
  features_title = COALESCE(features_title, 'Recursos Poderosos'),
  feature1_title = COALESCE(feature1_title, 'Desenvolvimento Acelerado'),
  feature1_description = COALESCE(feature1_description, 'Utilize IA para gerar código, automatizar tarefas e acelerar seu ciclo de desenvolvimento.'),
  feature2_title = COALESCE(feature2_title, 'Soluções Inovadoras'),
  feature2_description = COALESCE(feature2_description, 'Crie produtos e serviços inovadores com a ajuda de algoritmos de IA avançados.'),
  feature3_title = COALESCE(feature3_title, 'Escalabilidade e Performance'),
  feature3_description = COALESCE(feature3_description, 'Desenvolva aplicações robustas e escaláveis prontas para o futuro.'),
  about_section_title = COALESCE(about_section_title, 'Sobre Nós'),
  contact_section_title = COALESCE(contact_section_title, 'Entre em Contato'),
  contact_section_description = COALESCE(contact_section_description, 'Tem alguma pergunta ou quer discutir seu próximo projeto? Entre em contato conosco!'),
  contact_button_text = COALESCE(contact_button_text, 'Enviar E-mail'),
  footer_text = COALESCE(footer_text, '© 2023 IA Code Labs. Todos os direitos reservados.'),
  hero_gradient_from = COALESCE(hero_gradient_from, '#171717'),
  hero_gradient_to = COALESCE(hero_gradient_to, '#000000')
WHERE id = 1; -- Assuming a single row for site content with id = 1
