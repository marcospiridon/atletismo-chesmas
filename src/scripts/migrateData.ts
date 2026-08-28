import dotenv from 'dotenv';
import path from 'path';
// Carregar variáveis de ambiente a partir de src/.env.local
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env.local') });

import { createClient } from '@supabase/supabase-js';
import { 
  initialClubInfo, 
  initialNews, 
  initialTrainings, 
  initialResults, 
  initialGallery, 
  initialRegistrations 
} from '../data/initialData';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: Variáveis VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas no ambiente!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runMigration() {
  console.log('Iniciando migração de dados locais para o Supabase...');

  // 1. Migrar Club Info (Limpa tudo e insere a linha única)
  console.log('\n--- Migrando Club Info ---');
  const { error: clubDeleteError } = await supabase.from('club_info').delete().neq('name', '');
  if (clubDeleteError) {
    console.error('Erro ao limpar club_info:', clubDeleteError.message);
  } else {
    const { error: clubInsertError } = await supabase.from('club_info').insert({
      name: initialClubInfo.name,
      slogan: initialClubInfo.slogan,
      description: initialClubInfo.description,
      foundation_year: initialClubInfo.foundationYear,
      email: initialClubInfo.email,
      phone: initialClubInfo.phone,
      address: initialClubInfo.address,
      training_locations: initialClubInfo.trainingLocations,
      social_media: initialClubInfo.socialMedia,
      president: initialClubInfo.president,
      head_coach: initialClubInfo.headCoach,
      logo_url: initialClubInfo.logoUrl,
      admin_pin: '19780621' // PIN padrão
    });
    if (clubInsertError) console.error('Erro ao inserir club_info:', clubInsertError.message);
    else console.log('✓ club_info migrado com sucesso!');
  }

  // 2. Migrar News
  console.log('\n--- Migrando News ---');
  const { error: newsDeleteError } = await supabase.from('news').delete().neq('id', '');
  if (newsDeleteError) {
    console.error('Erro ao limpar news:', newsDeleteError.message);
  } else {
    const newsToInsert = initialNews.map(n => ({
      id: n.id,
      title: n.title,
      slug: n.slug,
      category: n.category,
      summary: n.summary,
      content: n.content,
      cover_image: n.coverImage,
      author: n.author,
      publish_date: n.publishDate,
      featured: n.featured,
      tags: n.tags,
      views: n.views,
      likes: n.likes
    }));
    const { error: newsInsertError } = await supabase.from('news').insert(newsToInsert);
    if (newsInsertError) console.error('Erro ao inserir news:', newsInsertError.message);
    else console.log(`✓ ${newsToInsert.length} notícias migradas com sucesso!`);
  }

  // 3. Migrar Trainings
  console.log('\n--- Migrando Trainings ---');
  const { error: trainingsDeleteError } = await supabase.from('trainings').delete().neq('id', '');
  if (trainingsDeleteError) {
    console.error('Erro ao limpar trainings:', trainingsDeleteError.message);
  } else {
    const trainingsToInsert = initialTrainings.map(t => ({
      id: t.id,
      title: t.title,
      category: t.category,
      day_of_week: t.dayOfWeek,
      time: t.time,
      location: t.location,
      coach: t.coach,
      target_level: t.targetLevel,
      focus: t.focus,
      notes: t.notes,
      active: t.active
    }));
    const { error: trainingsInsertError } = await supabase.from('trainings').insert(trainingsToInsert);
    if (trainingsInsertError) console.error('Erro ao inserir trainings:', trainingsInsertError.message);
    else console.log(`✓ ${trainingsToInsert.length} treinos migrados com sucesso!`);
  }

  // 4. Migrar Results
  console.log('\n--- Migrando Results ---');
  const { error: resultsDeleteError } = await supabase.from('results').delete().neq('id', '');
  if (resultsDeleteError) {
    console.error('Erro ao limpar results:', resultsDeleteError.message);
  } else {
    const resultsToInsert = initialResults.map(r => ({
      id: r.id,
      race_name: r.raceName,
      location: r.location,
      date: r.date,
      distance: r.distance,
      category: r.category,
      athlete_name: r.athleteName,
      bib_number: r.bibNumber,
      official_time: r.officialTime,
      pace: r.pace,
      overall_rank: r.overallRank,
      category_rank: r.categoryRank,
      podium_position: r.podiumPosition,
      medal_type: r.medalType,
      notes: r.notes,
      photo_url: r.photoUrl
    }));
    const { error: resultsInsertError } = await supabase.from('results').insert(resultsToInsert);
    if (resultsInsertError) console.error('Erro ao inserir results:', resultsInsertError.message);
    else console.log(`✓ ${resultsToInsert.length} resultados migrados com sucesso!`);
  }

  // 5. Migrar Gallery
  console.log('\n--- Migrando Gallery ---');
  const { error: galleryDeleteError } = await supabase.from('gallery').delete().neq('id', '');
  if (galleryDeleteError) {
    console.error('Erro ao limpar gallery:', galleryDeleteError.message);
  } else {
    const galleryToInsert = initialGallery.map(g => ({
      id: g.id,
      title: g.title,
      album: g.album,
      category: g.category,
      image_url: g.imageUrl,
      date: g.date,
      photographer: g.photographer
    }));
    const { error: galleryInsertError } = await supabase.from('gallery').insert(galleryToInsert);
    if (galleryInsertError) console.error('Erro ao inserir gallery:', galleryInsertError.message);
    else console.log(`✓ ${galleryToInsert.length} fotos da galeria migradas com sucesso!`);
  }

  // 6. Migrar Registrations
  console.log('\n--- Migrando Registrations ---');
  const { error: registrationsDeleteError } = await supabase.from('registrations').delete().neq('id', '');
  if (registrationsDeleteError) {
    console.error('Erro ao limpar registrations:', registrationsDeleteError.message);
  } else {
    const registrationsToInsert = initialRegistrations.map(r => ({
      id: r.id,
      registration_number: r.registrationNumber,
      full_name: r.fullName,
      email: r.email,
      phone: r.phone,
      birth_date: r.birthDate,
      id_number: r.idNumber,
      nif: r.nif,
      gender: r.gender,
      address: r.address,
      city: r.city,
      postal_code: r.postalCode,
      escalao: r.escalao,
      disciplines: r.disciplines,
      emergency_contact_name: r.emergencyContactName,
      emergency_contact_phone: r.emergencyContactPhone,
      medical_conditions: r.medicalConditions,
      experience_level: r.experienceLevel,
      terms_accepted: r.termsAccepted,
      rgpd_accepted: r.rgpdAccepted,
      status: r.status,
      submission_date: r.submissionDate,
      admin_notes: r.adminNotes
    }));
    const { error: registrationsInsertError } = await supabase.from('registrations').insert(registrationsToInsert);
    if (registrationsInsertError) console.error('Erro ao inserir registrations:', registrationsInsertError.message);
    else console.log(`✓ ${registrationsToInsert.length} inscrições migradas com sucesso!`);
  }

  console.log('\nMigração concluída!');
}

runMigration();
