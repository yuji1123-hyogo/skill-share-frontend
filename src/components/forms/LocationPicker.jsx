import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import TagList from '../molecules/TagList';


/**
 * Leafletのデフォルトアイコン設定の修正
 * デフォルトアイコンのパスを明示的に指定し、アイコンが表示されない問題を解決
 */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),  // Retina用の高解像度アイコン
  iconUrl: require('leaflet/dist/images/marker-icon.png'),           // 通常のアイコン
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),       // マーカーの影
});

/**
 * スタイル定義
 * コンポーネント全体のスタイリングをオブジェクトとして管理
 */
const mapStyles = {
  container: "relative space-y-4 z-0",              // コンポーネント全体のコンテナ
  mapWrapper: "relative h-[400px] w-full rounded-lg overflow-hidden bg-dark-primary border border-dark-accent", // 地図を囲むラッパー
  map: "h-full w-full relative !z-0",              // 地図本体のスタイル（z-indexを強制的に0に）
  infoBox: "bg-dark-primary p-4 rounded-lg border border-dark-accent relative",  // 位置情報表示ボックス
  errorBox: "bg-yellow-500/10 text-yellow-500 p-4 rounded-lg border border-yellow-500/20 relative" // エラー表示ボックス
};

/**
 * デフォルトの位置情報（東京・渋谷付近）
 */
const DEFAULT_POSITION = {
  lat: 35.6812,
  lng: 139.7671
};

/**
 * カスタムマーカーアイコンの作成
 */
const createClubIcon = (themeImage) => {
  return L.divIcon({
    html: `<img src="${themeImage || "./logo192.png"}" class="bg-black rounded-full w-8 h-8 object-cover flex items-center justify-center font-bold">`,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

/**
 * 地図クリックイベントを処理するサブコンポーネント
 */
const MapClickHandler = ({ onPositionChange }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onPositionChange({ lat, lng });
    }
  });
  return null;
};

/**
 * 位置情報選択コンポーネント
 * 地図表示、位置選択、住所表示の機能を提供
 */
const LocationPicker = ({ clubs = [], users = [], 
   setCoordinates = () => {},setClubAddress = () => {},mode = "search" }) => {
  console.log(clubs)
  // 状態管理
  const [position, setPosition] = useState(DEFAULT_POSITION);  // 選択された位置
  const [address, setAddress] = useState('');                 // 住所
  const [isLoading, setIsLoading] = useState(false);         // ローディング状態
  const [locationError, setLocationError] = useState('');     // エラーメッセージ
  const [isSaved, setIsSaved] = useState(false); // 保存状態を管理する新しいstate


  /**
   * 初期表示時の現在位置取得
   */
  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        // 位置情報取得成功時
        async (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(newPosition);
          await getAddressFromCoordinates(newPosition.lat, newPosition.lng);
          setLocationError('');
        },
        // 位置情報取得失敗時
        (error) => {
          console.error('位置情報の取得に失敗:', error);
          setLocationError('位置情報の取得に失敗しました。デフォルトの位置を表示します。');
          setIsLoading(false);
        }
      );
    } else {
      setLocationError('お使いのブラウザは位置情報をサポートしていません。');
    }
  }, []);

  /**
   * 座標から住所を取得する関数
   * OpenStreetMapのNominatim APIを使用
   */
  const getAddressFromCoordinates = async (lat, lng) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      console.error('住所の取得に失敗しました:', error);
      setAddress('住所の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 位置が変更された時の処理
   */
  const handlePositionChange = async (newPosition) => {
    setPosition(newPosition);//緯度経度を更新 
    await getAddressFromCoordinates(newPosition.lat, newPosition.lng);//住所を取得
  };

  // 位置情報のあるクラブのみをフィルタリング
  const clubsWithLocation = clubs.filter(club => 
    club.location && 
    club.location.coordinates && 
    club.location.coordinates.length === 2
  );

  // 位置情報保存のハンドラー
  const handleSaveLocation = () => {
    setCoordinates([position.lng, position.lat]);
    if (mode === "create-or-edit") {  
      setClubAddress(address);
    }
    setIsSaved(true);
    
    // 3秒後に保存状態をリセット
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className={mapStyles.container}>
      {/* エラーメッセージ表示 */}
      {locationError && (
        <div className={mapStyles.errorBox}>
          {locationError}
        </div>
      )}

      {/* 地図表示エリア */}
      <div className={mapStyles.mapWrapper}>
        <MapContainer 
          center={[position.lat, position.lng]} 
          zoom={13} 
          className={mapStyles.map}
          zoomControl={false}  // 左上のズームコントロールを非表示
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[position.lat, position.lng]} />
          <MapClickHandler onPositionChange={handlePositionChange} />

          {/* 位置情報のあるクラブのマーカーのみを表示 */}
          {clubsWithLocation.map(club => (
            <Marker 
              key={club.id}
              position={[club.location.coordinates[1], club.location.coordinates[0]]}
              icon={createClubIcon(club.themeImage)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{club.name}</h3>
                  <p className="text-sm text-gray-600">{club.description}</p>
                  <p className="text-sm text-blue-600">メンバー: {club.members?.length || 0}人</p>
                  <TagList tags={club.tags} variant='simple' />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* 位置情報表示エリア */}
      <div className={`${mapStyles.infoBox} ${isSaved ? 'ring-2 ring-green-500 border-green-500/50' : ''} transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <h3 className="text-gray-200 font-medium mb-2">選択した位置</h3>
          {isSaved && (
            <span className="text-green-500 text-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              保存済み
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-2">
          緯度: {position.lat.toFixed(6)}, 経度: {position.lng.toFixed(6)}
        </p>
        <p className="text-gray-200">
          {isLoading ? '住所を取得中...' : address || '地図をクリックして位置を選択してください'}
        </p>
      </div>

      {/* 位置情報保存ボタン */}
        <button 
          type="button"
          onClick={handleSaveLocation}
          className={`
            w-full px-4 py-2 rounded-md font-medium transition-all duration-300
            ${isSaved 
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            }
          `}
          disabled={isSaved}
        >
          {isSaved ? (
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {mode === "create-or-edit" ? "保存完了" : "検索結果"}
            </span>
          ) : (
            mode === "create-or-edit" ? "位置情報を保存" : "近くのクラブを検索" 
          )}
        </button>

      {/* 近くのクラブ一覧表示 */}
      {mode === "search" && clubsWithLocation.length > 0 && (
        <div className={mapStyles.infoBox}>
          <h3 className="text-gray-200 font-medium mb-2">近くのクラブ</h3>
          <div className="space-y-2">
            {clubsWithLocation.map(club => (
              <div key={club.id} className="flex items-center space-x-2 text-gray-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{club.name}</span>
                <span className="text-gray-400 text-sm">({club.members?.length || 0}人)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker; 