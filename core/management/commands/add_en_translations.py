"""
Management command: add_en_translations
Adds English translations to existing blog posts by reading from HTML files.
Run: python manage.py add_en_translations
"""
import os
from django.core.management.base import BaseCommand
from apps.blog.models import BlogPost

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)
))))

TRANSLATIONS = [
    {
        'slug': 'raspberry-pi-ai-hat',
        'title_en': 'Raspberry Pi and its AI HAT: Empowering AI Projects',
        'excerpt_en': (
            'Discover how the Raspberry Pi AI HAT is revolutionizing artificial intelligence '
            'projects with edge computing, enabling real-time AI processing without cloud connectivity.'
        ),
        'content_file': os.path.join(BASE_DIR, 'scripts', 'raspberry-pi-ai-hat.en.html'),
    },
]


class Command(BaseCommand):
    help = 'Adds English translations to existing blog posts'

    def handle(self, *args, **options):
        for t in TRANSLATIONS:
            try:
                post = BlogPost.objects.get(slug=t['slug'])
                with open(t['content_file'], 'r', encoding='utf-8') as f:
                    content_en = f.read().strip()
                post.title_en = t['title_en']
                post.excerpt_en = t['excerpt_en']
                post.content_en = content_en
                post.save(update_fields=['title_en', 'excerpt_en', 'content_en'])
                length = len(content_en)
                self.stdout.write(self.style.SUCCESS(
                    'OK: {} saved ({} chars)'.format(post.slug, length)
                ))
            except BlogPost.DoesNotExist:
                self.stdout.write(self.style.WARNING(
                    'Post not found: {}'.format(t['slug'])
                ))
