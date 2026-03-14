import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentCheckboxesProps {
  privacyChecked: boolean;
  onPrivacyChange: (checked: boolean) => void;
  newsletterChecked?: boolean;
  onNewsletterChange?: (checked: boolean) => void;
  showNewsletter?: boolean;
  privacyError?: string;
}

/**
 * Reusable GDPR consent checkboxes for forms.
 * - Mandatory privacy policy acceptance
 * - Optional newsletter opt-in
 */
const ConsentCheckboxes = ({
  privacyChecked,
  onPrivacyChange,
  newsletterChecked = false,
  onNewsletterChange,
  showNewsletter = true,
  privacyError,
}: ConsentCheckboxesProps) => {
  return (
    <div className="space-y-3">
      {/* Mandatory: Privacy policy */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent-privacy"
          checked={privacyChecked}
          onCheckedChange={(v) => onPrivacyChange(v === true)}
          className="mt-0.5"
        />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="consent-privacy"
            className="text-sm font-normal text-muted-foreground cursor-pointer leading-relaxed"
          >
            Ik ga akkoord met de{" "}
            <Link
              to="/privacyverklaring"
              target="_blank"
              className="text-primary hover:underline font-medium"
            >
              privacyverklaring
            </Link>{" "}
            *
          </label>
          {privacyError && (
            <p className="text-[0.8rem] font-medium text-destructive">{privacyError}</p>
          )}
        </div>
      </div>

      {/* Optional: Newsletter */}
      {showNewsletter && (
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent-newsletter"
            checked={newsletterChecked}
            onCheckedChange={(v) => onNewsletterChange?.(v === true)}
            className="mt-0.5"
          />
          <label
            htmlFor="consent-newsletter"
            className="text-sm font-normal text-muted-foreground cursor-pointer leading-relaxed"
          >
            Ik wil graag relevante rapporten en de nieuwsbrief ontvangen.
          </label>
        </div>
      )}
    </div>
  );
};

export default ConsentCheckboxes;
