import PropTypes from 'prop-types';

/**
 * フォームのエラーメッセージを表示するコンポーネント
 * @param {Object} props
 * @param {string} props.error - エラーメッセージ
 * @param {string} [props.className] - 追加のスタイルクラス
 * @param {string} [props.variant] - エラーメッセージの表示バリエーション
 */
const FormErrorMessage = ({ 
  error, 
  className = "",
  variant = "simple" // simple, box, inline のいずれか
}) => {
  if (!error) return null;

  const baseStyles = "text-sm transition-all duration-200";
  
  const variantStyles = {
    simple: "mt-1 text-red-500",
    box: "mt-2 p-2 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20",
    inline: "ml-2 text-red-500 inline-flex items-center",
  };

  const iconByVariant = {
    simple: null,
    box: (
      <svg 
        className="w-4 h-4 mr-1.5 flex-shrink-0" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
          clipRule="evenodd" 
        />
      </svg>
    ),
    inline: (
      <svg 
        className="w-4 h-4 mr-1 flex-shrink-0" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
          clipRule="evenodd" 
        />
      </svg>
    ),
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <div className="flex items-center">
        {iconByVariant[variant]}
        <span>{error}</span>
      </div>
    </div>
  );
};

FormErrorMessage.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['simple', 'box', 'inline'])
};

export default FormErrorMessage;
