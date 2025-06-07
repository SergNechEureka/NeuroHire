import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { t } = useTranslation('header');

  return (
    <header className={cn(styles.header, className)}>
      <div className={styles.search}>
        <Search className={styles.searchIcon} />
        <Input type="search" placeholder={t('search.placeholder')} className={styles.searchInput} />
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" size="icon" className={styles.actionButton}>
          <Bell className={styles.actionIcon} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className={styles.actionButton}>
              <User className={styles.actionIcon} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t('userMenu.profile')}</DropdownMenuItem>
            <DropdownMenuItem>{t('userMenu.settings')}</DropdownMenuItem>
            <DropdownMenuItem>{t('userMenu.logout')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
